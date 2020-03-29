{
	//implement localStorage capability and check on reload

	const menuIcon = document.getElementById("hamburger-menu");
	const navLinks = document.querySelector(".nav-links");
	const form = document.querySelector("form");
	const longLink = document.querySelector("input[type='text']");
	const linkSection = document.querySelector(".shortened-links");
	const URL = "https://rel.ink";

	form.addEventListener("submit", shortenLink);
	menuIcon.addEventListener("click", toggleMenu);

	function toggleMenu(e) {
		navLinks.classList.toggle("show");
	}

	async function shortenLink(e) {
		e.preventDefault();
		if (longLink.value.length < 1) {
			//make text input border red
			//display small text undernath "please add a valid link"
		}
		try {
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
			displayLink(linkObj);
		} catch (error) {
			//make text input border red
			//display small text undernath "please input a valid link"
		}
	}

	function displayLink(link) {
		linkSection.innerHTML += generateDiv(link);
	}

	function generateDiv(link) {
		if (link.url.length > 34) {
			link.url = `${link.url.substr(0, 34)}...`;
		}
		return `<div>
			<p>${link.url}</p>
			<a href='${link.shortLink}'>${link.shortLink}</a>
			<button>Copy</button>
		</div>`;
	}
}
