const nodemailer = require('nodemailer');
const redisConnection = require("./redis-connection")
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
    from: '"Pranit Kulkarni" pkulkar2@stevens.edu', // sender address
    to: '<vishwajeetkakde@gmail.com>', // list of receivers
    subject: 'Hello from CS554 Project SMTP ✔', // Subject laine
    text: 'Hello project partner! Have a good day. Testing emails using sendgrid SMTP server', // plain text body
    html: '<b>Hello project partner! Have a good day</b> <br> Testing emails using sendgrid SMTP server from worker', // html body
    attachments: [{
        filename: 'reddit_report.txt',
        content: 'This is a demo user report'
    }],
    /*headers:{
        'X-SMTPAPI': {"send_at": 1525516800}    // Isn't working as of now..
    }*/
};

redisConnection.on("sendEmail:request:*", async(message,channel) => {
    console.log("Redis pubsub event called..")
    let requestId = message.requestId;
    let eventName = message.eventName;
    var response;

    //console.log("Get person redis event called in worker")

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            response = { error: error }
        }

        console.log('Message sent: %s'+ info.messageId);
        response = { message: "Email sent from the app"}
    });

    redisConnection.emit(successEvent, {
        requestId: requestId,
        data:response,
        eventName: eventName
    });
})
/*module.exports = {

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
}*/