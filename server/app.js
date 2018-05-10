const express = require('express');
const mySmtp = require('./my_smtp')

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/sendEmail', (req,res) => {

  let sent = mySmtp.sendEmail()

  if(sent)
    res.send({ express: "Email sent notification from express"})
  else
  res.send({ express: "Email sending failed: from express"})
})

app.listen(port, () => console.log(`Express server listening on port ${port}`));