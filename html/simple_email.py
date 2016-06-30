email_template = dict()

email_template['from'] = 'vc@anu.edu.au'

email_template['from_appearance'] = 'Vice-Chancellor <vc@anu.edu.au>'
email_template['sender'] = 'Vice-Chancellor <vc@anu.edu.au>'
email_template['subject'] = 'Simple Test'
email_template['text_component'] = (
"""
This is a simple test to see whether or not we can pass URLs through to Outlook.Login to ISIS
"""
)

email_template['html_component'] = (
"""
<html>
<body>
<div>
This is a simple test to see whether or not we can pass URLs through to Outlook.
<a href="http://www.anu.edu.au">Go to ANU Website</a>
</div>
</body>
</html>
"""
)
