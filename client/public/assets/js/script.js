document.addEventListener('DOMContentLoaded', function () {
  // Define URL path
  // var pathname = window.location.pathname
  /* 
	// Navigation bar shadow when scrolling
	var scrollnav = document.getElementById("navbar");
	console.log(scrollnav)
	scrollnav.classList.add("noScroll");
	window.addEventListener("scroll", () => {
		if (window.scrollY != 0) {
			scrollnav.classList.remove("noScroll");

		} else {
			scrollnav.classList.add("noScroll");
		}
	});

	if (pathname === '/' || pathname === '/dashboard' || pathname === '/jobs'){
		// Toggle Filter Visibility
		const dropdown = document.getElementById("filter-toggle");
		const container = document.getElementById("filter-container");
		dropdown.addEventListener('click', function() { 
			dropdown.classList.toggle('filter-active');
			container.classList.toggle('hidden');
		}, false);
	}

	if (pathname === '/jobs/add'){
		// Paste Job URL
		const paste = window.document.getElementById("paste");
		paste.addEventListener('click', () => {
			console.log('paste')
			if (!paste.value){
				// Attempt to read clipboard text
				navigator.clipboard.readText()
					.then(text => {
						paste.value = text;
					})
						.catch(err => {
						console.log('Something went wrong', err);
					})
			}
		});
	}
	 */
});
