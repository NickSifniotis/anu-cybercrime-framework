#!/usr/bin/env python

import os
import socket
import sys

"""
	Error sending email so close down and clean up the connection.
"""
def die (error_message):
	global connection

	print error_message
	connection.close()
	sys.exit (1)


"""
	Sends a line of data to the email server, and collects the response code.
	If the response code is not what is expected, then crap out and kill the connection.
"""
def send_and_receive (data, expected_response):
	global connection

	send (data)
	
	received = connection.recv (1024)
	code = int(received[:3])
	if code == expected_response:
		print "ok.."
	else:
		die ("Error sending message: Code " + str(code) + ", " + str(expected_response))

	return



"""
	Short little wrapper method for sending data through the SMTP connection.
"""
def send (data):
	global connection
	if (data != ""):
		data = data + "\n"
		connection.send (data)

	return



"""
	Sends out the email body - this is all the MIME content stuff and so forth.
	This is the part of the code that will have to play games with the anti-spam filter.
"""
def send_email_body (template):
	global connection

	# start with the Subject and From data
	send ("From: " + template['from_appearance'])
	send ("To: " + template['to'])
	send ("Subject: " + template['subject'])

	# MIME header
	send ("Mime-Version: 1.0;")
	send ("Content-Type: text/html; charset=\"ISO-8859-1\";")
	send ("Content-Transfer-Encoding: 7bit;")

	# message body - text version first
	send (template['html_component'] + "\n")

	return


# error if the user hasn't provided enough command line arguments
if len(sys.argv) != 5:
	print ("Error! Correct usage is email.py <batch_number> <user_id> <user_email> <template>")
	sys.exit(1);


# extract the command line args, that control which email is going out, which user to send to etc
batch_number = sys.argv[1]
user_id = sys.argv[2]
user_email = sys.argv[3]
template = sys.argv[4]

exec(open(template).read())
email_template['to'] = user_email


# substitute in the variables into the HTML component
email_template['html_component'] = email_template['html_component'].replace("<USER_ID>", str(user_id))
email_template['html_comhttps://www.google.com.au/search?client=ubuntu&channel=fs&q=php+convert+string+to+int&ie=utf-8&oe=utf-8&gfe_rd=cr&ei=8CPOV7-XOqvM8geUioL4BQponent'] = email_template['html_component'].replace("<BATCH_ID>", str(batch_number))


# set up the connection
TCP_IP = '130.56.66.51'
TCP_PORT = 25
BUFFER_SIZE = 1024


connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection.connect((TCP_IP, TCP_PORT))

send_and_receive ("", 220)
send_and_receive ("HELO anu.edu.au", 250)
send_and_receive ("MAIL FROM:" + email_template['from'], 250)
send_and_receive ("RCPT TO:" + email_template['to'], 250)
send_and_receive ("DATA", 354)

send_email_body (email_template)

send_and_receive (".", 250)
send_and_receive ("QUIT", 221)

connection.close()

# log the successful transmission of the email into the system database.
os.system ("php log_email_sent.php " + user_id);

