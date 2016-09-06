email_template = dict()

email_template['from'] = 'MailAdministrator<mailadministrator@anu.edu.au>'

email_template['from_appearance'] = 'Mail Administrator <mailadministrator@anu.edu.au>'
email_template['subject'] = 'Simple Test'

email_template['html_component'] = (
"""
Your mailbox is currently at capacity and you are eligible for a free upgrade.
<html>
<body>
<p><a href="http://150.203.139.148/psp/sscsprod/ISIS.php?id=nasty_link">Go to ANU Website</a></p>
</div>
</body>
</html>
"""
)

