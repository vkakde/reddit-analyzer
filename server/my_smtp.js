const nodemailer = require('nodemailer');
/*import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'*/

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
    from: '"Bruce Wayne 👻" <pranitkulkarni24@gmail.com>', // sender address
    to: 'pkulkar2@stevens.edu', // list of receivers
    subject: 'Hello from SMTP ✔', // Subject laine
    text: 'Hello bro! Have a good day. Sent using sendgrid SMTP server', // plain text body
    html: '<b>Hello bro! Have a good day</b> <br> Sent using sendgrid SMTP server', // html body
    attachments: [{
        filename: 'reddit_report.txt',
        content: 'This is a demo user report'
    }],
    /*headers:{
        'X-SMTPAPI': {"send_at": 1525516800}    // Isn't working as of now..
    }*/
};

/*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }

    console.log('Message sent: %s' + info.messageId);
});*/

module.exports = {
    async sendEmail(){
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            }

            console.log('Message sent: %s'+ info.messageId);
            return true;
        });
    }
}