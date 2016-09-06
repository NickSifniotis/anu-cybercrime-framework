import smtplib 
import getpass

import mimetypes

import email
import email.mime.application

import csv
from collections import defaultdict

username = raw_input("Enter your ANU username: ")
password = getpass.getpass("Please enter your ANU password: ")

with open('justgrigori.csv', 'rb') as file:
	for line in file.readlines():
		msg = email.mime.Multipart.MIMEMultipart()
		array = line.split(',')
		uID = array[0]
		msg['Subject'] = 'Test Email ~10'
		msg['From'] = 'Totally an Admin <alegitemail@anu.edu.au>'
		msg['To'] = uID+'@anu.edu.au'

		#body = email.mime.Text.MIMEText("Here is the plaintext part of the email", 'plain')
		#msg.attach(body)
		
		htmlmail = """\
		<html>
  			<head></head>
  			<body>
    				<p>This is the HTML part of the email.</p>
    				<p>Text and HTML</p>
  			</body>
		</html>
		"""
		htmlpart = email.mime.Text.MIMEText(htmlmail, 'html')
		msg.attach(htmlpart)

		filename='demodoc_embedded_JS.pdf'
		fp=open(filename, 'rb')
		att = email.mime.application.MIMEApplication(fp.read(),_subtype="pdf")
		fp.close()
		att.add_header('Content-Disposition','attachment',filename=filename)
		msg.attach(att)

		s = smtplib.SMTP('smtphost.anu.edu.au')
		s.starttls()
		s.login(username,password)
		s.sendmail('alegitemail@anu.edu.au',[uID+'@anu.edu.au'],msg.as_string())
		print("Mail sent to "+uID+" successfully!")
		s.quit()
