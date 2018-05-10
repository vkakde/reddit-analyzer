const express = require('express');
const mySmtp = require('./my_smtp');
var API_helper_Reddit = require("./API-helper-reddit.js");

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/sendEmail', (req, res) => {

  let sent = mySmtp.sendEmail()

  if (sent)
    res.send({ express: "Email sent notification from express" })
  else
    res.send({ express: "Email sending failed: from express" })
})

// this route serve's reddit user's About
app.get("/reddit/about/:username", async (req, res) => {
  console.log(`HERE, searching for ${req.params.username}`);
  try {
    var result = await API_helper_Reddit.getUserAbout(req.params.username);
    res.send(result.data.data);
  } catch (error) {
    res.status(500).send();
  };
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));