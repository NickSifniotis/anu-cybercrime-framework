var page_content = {
	page_title: "ANU Cybercrime Observatory Home Page",
	nav_item: "Main ANU Site",
	heading: "ANU Cybercrime Observatory",
	content: "If you're seeing this message, it means that our website is still under construction. Please check back later."
};


function set_page_content()
{
	document.getElementById("page_title").innerHTML   = page_content.page_title;
	document.getElementById("page_heading").innerHTML = page_content.heading;
	document.getElementById("nav_item").innerHTML     = page_content.nav_item
	document.getElementById("page_content").innerHTML = page_content.content;
}


window.onload = set_page_content;
