#!/bin/bash

(
sleep 30
echo helo usr
sleep 10
echo MAIL FROM:arealemail@anu.edu.au
sleep 10
while IFS=, read col1
do
	echo "RCPT TO:${col1}@anu.edu.au"
	sleep 10
done < testlist.csv
sleep 10
echo data
sleep 10
echo "From: arealemail@anu.edu.au"
sleep 10
while IFS=, read col1
do
	echo "To: ${col1}@anu.edu.au;"
	sleep 10
done < testlist.csv
echo "Subject: Testing123;"
sleep 10
echo "Mime-Version: 1.0;"
sleep 10
echo "Content-Type: text/html; charset="ISO-8859-1";"
sleep 10
echo "Content-Transfer-Encoding: 7bit;"
sleep 10
echo "<html>"
echo "<body>"
echo "If you can read this, I can send emails by script"
echo "</body>"
echo "</html>"
sleep 10
echo "."
sleep 10
echo exit
)|telnet smtphost.anu.edu.au 25 
