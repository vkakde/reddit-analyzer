const express = require('express');
const mySmtp = require('./my_smtp');
var API_helper_Reddit = require("./API-helper-reddit.js");

const app = express();
const port = process.env.PORT || 5000;

// this route recieves email sending requests
app.get('/api/sendEmail', (req, res) => {
  let sent = mySmtp.sendEmail()
  if (sent)
    res.send({ express: "Email sent notification from express" })
  else
    res.send({ express: "Email sending failed: from express" })
})

// this route serves reddit user's About
app.get("/reddit/about/:username", async (req, res) => {
  try {
    var result = await API_helper_Reddit.getUserAbout(req.params.username);
    res.send(result.data.data);
  } catch (error) {
    res.status(500).send();
  };
});

// this route serves reddit user's comment history
app.get("/reddit/comments/:username", async (req, res) => {
  try {
    var result = await API_helper_Reddit.getUserComments(req.params.username);
    res.send(result);
  } catch (error) {
    res.status(500).send();
  };
});

// this route serves reddit user's post history
app.get("/reddit/posts/:username", async (req, res) => {
  try {
    var result = await API_helper_Reddit.getUserPosts(req.params.username);
    res.send(result);
  } catch (error) {
    res.status(500).send();
  };
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));