#!/usr/bin/env python

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
	send ("Subject: " + template['subject'])
	send ("From: " + template['from_appearance'])
	#send ("To: " + template['to_appearance'])
	send ("Sender: " + template['sender'])

	# MIME header
	send ("Content-Type: multipart/alternative;")
	send ("	boundary=\"_000_PS1PR06MB1722D09F71B3E2ACF7A801CDAB2D0PS1PR06MB1722apcp_\"")
	send ("MIME-Version: 1.0")

	# message body - text version first
	send ("--_000_PS1PR06MB1722D09F71B3E2ACF7A801CDAB2D0PS1PR06MB1722apcp_")
	send ("Content-Type: text/plain; charset=\"iso-8859-1\"")
	send ("Content-Transfer-Encoding: quoted-printable\n")
	send (template['text_component'] + "\n")

	# then the HTML equivalent
	send ("--_000_PS1PR06MB1722D09F71B3E2ACF7A801CDAB2D0PS1PR06MB1722apcp_")
	send ("Content-Type: text/html; charset=\"iso-8859-1\"")
	send ("Content-Transfer-Encoding: quoted-printable\n")
	send (template['html_component'] + "\n")

	# end it
	send ("--_000_PS1PR06MB1722D09F71B3E2ACF7A801CDAB2D0PS1PR06MB1722apcp_--")
	return




TCP_IP = '130.56.66.51'
TCP_PORT = 25
BUFFER_SIZE = 1024


exec(open("test_email_template.py").read())


connection = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection.connect((TCP_IP, TCP_PORT))

send_and_receive ("", 220)
send_and_receive ("HELO anu.edu.au", 250)
send_and_receive ("MAIL FROM: <" + email_template['from'] + ">", 250)
send_and_receive ("RCPT TO: <" + email_template['to'] + ">", 250)
send_and_receive ("DATA", 354)

send_email_body (email_template)

send_and_receive (".", 250)
send_and_receive ("QUIT", 221)

connection.close()


