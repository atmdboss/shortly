{
	const menuIcon = document.getElementById("hamburger-menu");
	const navLinks = document.querySelector(".nav-links");
	menuIcon.addEventListener("click", toggleMenu);
	function toggleMenu(e) {
		navLinks.classList.toggle("show");
	}
}
