const express = require('express');
const mySmtp = require('./my_smtp')
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/sendEmail', async(req,res) => {

  /*let sent = mySmtp.sendEmail()

  if(sent)
    res.send({ express: "Email sent notification from express"})
  else
  res.send({ express: "Email sending failed: from express"})*/

  try{
    console.log("Route called")

    let response = await nrpSender.sendMessage({
        redis: redisConnection,
        eventName: "sendEmail",
        /*data: {
            message: req.params.id
        }*/
    })

    res.json(response)

}catch(e){
    res.json({ error: e.message });
}
})

app.listen(port, () => console.log(`Express server listening on port ${port}`));