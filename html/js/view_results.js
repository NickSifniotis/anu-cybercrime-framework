var page_content = {
	page_title: "ANU Cybercrime Observatory Home Page",
	heading: "ANU Cybercrime Observatory",
	oops: "Oops! This was a test from the ANU Cybercrime Observatory Experiment \"Wi-Fi Usage and Cybercrime Risks in University Student Communities\"",
	content: "<div>We are testing participants' susceptibility to spear phishing and scam/spam attempts. This notification indicates that you have fallen for a FAKE spam/phishing attempt. Don't worry, as this was not a legitimate spam/phishing attempt any identifying information you may have provided is not compromised. Your participation in this study is of great value for our research as we attempt to identify where our online vulnerabilities lie and how we can protect ourselves.</div>",
	content2: "<div><b>PLEASE NOTE</b> During our research phase you may in fact be exposed to 'real' scam, spam or phishing attempts. Remain vigilant and be careful about your online activity. For useful cyber safety information visit: <a href=\"http://dmm.anu.edu.au/7JPtR_cybersafety/package.php\">http://dmm.anu.edu.au/7JPtR_cybersafety/package.php</a></div>",
	footer: "For queries regarding the study you are welcome to contact roderic.broadhurst@anu.edu.au or cyberobs.anu@gmail.com with the subject line as \"Queries about WiFi usage study (protocol number: 2015/038)\""
};


function set_page_content()
{
	document.getElementById("_header_page_title").innerHTML = page_content.page_title;
	document.getElementById("page_heading").innerHTML       = page_content.heading;
	document.getElementById("footer").innerHTML             = page_content.footer;
}


window.onload = set_page_content;
