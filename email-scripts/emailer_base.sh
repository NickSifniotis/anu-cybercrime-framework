#!/bin/bash

(
sleep 30
echo helo usr
sleep 10
echo mail from:<faketarget>
sleep 10
while IFS=, read col1
do
	echo "RCPT TO:${col1}@anu.edu.au"
	sleep 10
done < userlist.csv
sleep 10
echo data
sleep 10
echo "From: <faketarget>;"
sleep 10
while IFS=, read col1
do
	echo "To: ${col1}@anu.edu.au;"
	sleep 10
done < userlist.csv
echo "Subject: <subject here>;"
sleep 10
echo "Mime-Version: 1.0;"
sleep 10
echo "Content-Type: text/html; charset="ISO-8859-1";"
sleep 10
echo "Content-Transfer-Encoding: 7bit;"
sleep 10
echo "<Email contents in html. Each paragraph should probably be a separate echo, with a echo "" in between >"
sleep 10
echo "."
sleep 10
echo exit
)|telnet smtphost.anu.edu.au 25 
