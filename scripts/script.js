function init() {
	const menuIcon = document.getElementById("hamburger-menu");
	const navLinks = document.querySelector(".nav-links");
	const form = document.querySelector("form");
	const longLink = document.querySelector("input[type='text']");
	const linkSection = document.querySelector(".shortened-links");
	const errorMsg = document.getElementById("error-msg");
	const URL = "https://rel.ink";

	form.addEventListener("submit", shortenLink);
	menuIcon.addEventListener("click", toggleMenu);
	document.addEventListener("DOMContentLoaded", getFromLocalStorage);

	function toggleMenu() {
		navLinks.classList.toggle("show");
	}

	async function shortenLink(e) {
		e.preventDefault();

		try {
			if (longLink.value.length < 1) {
				throw Error;
			}

			const response = await fetch(`${URL}/api/links/`, {
				method: "post",
				headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				body: `url=${longLink.value}`
			});
			if (response.status === 400) {
				//user error
				throw Error;
			}
			const data = await response.json();
			const linkObj = { ...data, shortLink: `${URL}/${data.hashid}` };
			addToLocalStorage(linkObj);
			displayLink(linkObj);
		} catch (error) {
			showErrorMsgSecs(5);
		}
	}

	function displayLink(link) {
		linkSection.appendChild(generateDiv(link));
	}

	function generateDiv(link) {
		if (link.url.length > 34) {
			link.url = `${link.url.substr(0, 34)}...`;
		}
		const div = document.createElement("div");
		const p = document.createElement("p");
		const a = document.createElement("a");
		const button = document.createElement("button");
		button.textContent = "Copy";
		button.addEventListener("click", copyToClipboard);
		a.setAttribute("href", link.shortLink);
		a.textContent = link.shortLink;
		p.textContent = link.url;
		div.appendChild(p);
		div.appendChild(a);
		div.appendChild(button);
		console;
		return div;
	}

	function addToLocalStorage(newLink) {
		let links = JSON.parse(localStorage.getItem("links"));
		links = links ? [...links, newLink] : [newLink];
		localStorage.setItem("links", JSON.stringify(links));
	}

	function getFromLocalStorage() {
		const links = JSON.parse(localStorage.getItem("links"));
		if (links) {
			links.forEach(link => displayLink(link));
		}
	}
	function showErrorMsgSecs(secs) {
		form.classList.add("error");
		errorMsg.textContent = "Please add a valid link";
		setTimeout(() => {
			hideErrorMsg();
		}, secs * 1000);
	}
	function hideErrorMsg() {
		form.classList.remove("error");
		errorMsg.textContent = "";
	}
	function copyToClipboard() {
		const button = this;
		const a = this.parentElement.children[1]; //<a> element
		navigator.clipboard.writeText(a.text).then(() => {
			//style for copied
			button.classList.add("copied");
			button.textContent = "Copied";
			setTimeout(() => {
				button.classList.remove("copied");
				button.textContent = "Copy";
			}, 2000);
		});
	}
}
init();
