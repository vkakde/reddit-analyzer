const express = require('express');
const mySmtp = require('./my_smtp')
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");
var API_helper_Reddit = require("./API-helper-reddit.js");

var bluebird = require('bluebird');
var redis = bluebird.Promise.promisifyAll(require('redis'));

const app = express();
const port = process.env.PORT || 5000;

// create Redis client
let redisClient = redis.createClient();
redisClient.on('connect', function(){
  console.log('Redis connected on port:6379 ...');
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