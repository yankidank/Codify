$(document).ready(function(){
	// Navigation bar shadow when scrolling
	var scrollnav = document.getElementById("navbar");
	scrollnav.classList.add("noScroll");
	window.addEventListener("scroll", () => {
		if (window.scrollY != 0) {
			scrollnav.classList.remove("noScroll");
		} else {
			scrollnav.classList.add("noScroll");
		}
	});


	$("#filter-toggle").click(function(){
		$("#filter-container").slideToggle();
	});
});