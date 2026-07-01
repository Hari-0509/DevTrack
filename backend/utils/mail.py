from flask_mail import Message


def send_reset_email(mail, recipient, reset_link):

    msg = Message(
        subject="Reset your DevTrack password",
        recipients=[recipient]
    )

    msg.body = f"""
Hello,

A password reset was requested for your DevTrack account.

Click the link below:

{reset_link}

If you did not request this, simply ignore this email.

Regards,
DevTrack
"""

    mail.send(msg)