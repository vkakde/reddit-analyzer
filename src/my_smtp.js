
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'apikey', 
        pass: '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'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Bruce Wayne 👻" <pkulkar2@stevens.edu>', // sender address
    to: 'pranitkulkarni24@gmail.com', // list of receivers
    subject: 'Hello from SMTP ✔', // Subject laine
    text: 'Hello bro! Have a goodnight. Sent using sendgrid SMTP server', // plain text body
    html: '<b>Hello bro! Have a goodnight</b> <br> Sent using sendgrid SMTP server', // html body
    attachments:[{
        filename: 'reddit_report.txt',
        content: 'This is a demo user report'
    }],
    headers:{
        'X-SMTPAPI': {"send_at": 1525516800}
    }
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});