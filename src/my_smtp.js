const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'apikey', 
        pass: '<API KEY IS IN OUR GOOGLE KEEP ACCOUNT>' 
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
        'X-SMTPAPI': {"send_at": 1525516800}    // Isn't working as of now..
    }
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }

    console.log('Message sent: %s'+ info.messageId);
});

/*module.exports = {

    async sendEmail(){
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

            console.log('Message sent: %s'+ info.messageId);
        });
    }
}*/



