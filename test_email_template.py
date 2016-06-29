email_template = dict()

email_template['from'] = 'Nick Sifniotis <u5809912@anu.edu.au>'
email_template['to'] = 'u5809912@anu.edu.au'

email_template['from_appearance'] = 'Nick Sifniotis <u5809912@anu.edu.au>'
email_template['to_appearance'] = 'Students.all <students.all-bounces@anu.edu.au> on behalf of Student List Coordinator <studentlist.coord@anu.edu.au>'
email_template['sender'] = 'Nick Sifniotis <u5809912@anu.edu.au>'#'Students.all <students.all-bounces@anu.edu.au>'
email_template['subject'] = '[Students.all] ANU Results for First Semester, 2016'
email_template['text_component'] = (
"""
Dear Student,

Please login to ISIS to access your results for First Semester, 2016.


Grades

For information on grading scale for your courses, please see the ANU Grading Scale. If you are missing any grades/marks, please contact the respective College for information on its availability.


Supplementary Examinations

If you have been offered a supplementary examination, you have seven working days from the date of notification of the result to notify the relevant College of your acceptance of the offer of a supplementary examination. For more information, please see the Supplementary Exams page.


Assessment Appeals

For any appeals regarding your grades or marks, please contact the Course Convenor or relevant College. For more information, please see the Assessment Appeals page.


Printed Results

You can print a copy of your Statement of Results from ISIS which will be available later today. If you require a certified copy of your results, you may request an ANU Academic Transcript from the ANU Student Exchange.


More information

Please see here for more information on Assessment and Exams.


For further information, please contact Student Central: student@anu.edu.au



Yours sincerely


Mark Erickson

Registrar, Student Administration
"""
)

email_template['html_component'] = (
"""
<div id=3D"divtagdefaultwrapper" style=3D"font-size:12pt;color:#000000;background-color:#FFFFFF;font-family:Calibri,Arial,Helvetica,sans-serif;">
<p>Dear Student,</p>
<p>
Please <a href="http://150.203.139.148/psp/sscsprod/ISIS.html">login to ISIS</a> to access your results for First Semester, 2016.</p>
<h4>Grades</h4>
<p>
For information on grading scale for your courses, please see the ANU Grading Scale<http://www.anu.edu.au/students/program-administration/assessments-exams/grading-scale>. If you are missing any grades/marks, please contact the respective College<http://www.anu.edu.au/study/contacts> for information on its availability.</p>
<h4>Supplementary Examinations</h4>
<p>
If you have been offered a supplementary examination, you have seven working days from the date of notification of the result to notify the relevant College<http://www.anu.edu.au/study/contacts> of your acceptance of the offer of a supplementary examination. For more information, please see the Supplementary Exams<http://www.anu.edu.au/students/program-administration/assessments-exams/supplementary-exams> page.</p>
<h4>Assessment Appeals</h4>
<p>
For any appeals regarding your grades or marks, please contact the Course Convenor or relevant College<http://www.anu.edu.au/study/contacts>. For more information, please see the Assessment Appeals<http://www.anu.edu.au/students/program-administration/assessments-exams/assessment-appeals> page.</p>
<h4>Printed Results</h4>
<p>
You can print a copy of your Statement of Results from <a href="https://isis.anu.edu.au/">ISIS</a> which will be available later today. If you require a certified copy of your results, you may request an <a href="http://www.anu.edu.au/students/program-administration/program-management/purchase-an-academic-transcript">ANU Academic Transcript</a> from the ANU Student Exchange.</p>
<h4>More information</h4>
<p>
Please see <a href="http://www.anu.edu.au/students/program-administration/assessments-exams">here</a> for more information on Assessment and Exams.</p>
<p>For further information, please contact Student Central: student@anu.edu.au<mailto:student@anu.edu.au></p>
<br>
Yours sincerely<br>
<br>
<br>
Mark Erickson<br>
<br>
Registrar, Student Administration<br>
</div>
"""
)
