$(document).ready(function() {
	// Define URL path
	var pathname = window.location.pathname

	// Navigation bar shadow when scrolling
	var scrollnav = $("#navbar");
	scrollnav.addClass("noScroll");
	$(window).scroll(function(){
		if (window.scrollY != 0) {
			scrollnav.removeClass("noScroll");

		} else {
			scrollnav.addClass("noScroll");
		}
	});

	// Filter Dropdown
	$("#filter-toggle").click(function(){
		$("#filter-container").slideToggle();
		$("#filter-toggle").toggleClass("filter-active");
	});
	
	if (pathname === '/jobs/add'){
		// Paste Job URL
		$('#paste').click(function(){
			if (!$('#paste').value){
				// Attempt to read clipboard text
				navigator.clipboard.readText()
				 .then(text => {
				  	$('#paste').value = text;
				 })
				  .catch(err => {
					console.log('Something went wrong', err);
				 })
			}
		});
	}
});