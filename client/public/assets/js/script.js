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

	// Filter Dropdown
	$("#filter-toggle").click(function(){
		$("#filter-container").slideToggle();
		$("#filter-toggle").toggleClass("filter-active");
	});

	// Paste Job URL
	const resultsEl = window.document.querySelector('#paste');
	resultsEl.addEventListener('click', () => {
		if (!resultsEl.value){
			navigator.clipboard.readText()
			  .then(text => {
			  	resultsEl.value = text;
			  })
			  .catch(err => {
			  	console.log('Something went wrong', err);
			  })
		}
	});
});