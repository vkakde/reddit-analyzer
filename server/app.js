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
redisClient.on('connect', function () {
  console.log('Redis connected on port:6379 ...');
});

app.get('/api/sendEmail', async (req, res) => {

  /*let sent = mySmtp.sendEmail()

  if(sent)
    res.send({ express: "Email sent notification from express"})
  else
  res.send({ express: "Email sending failed: from express"})*/

  try {
    console.log("Route called")

    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "sendEmail",
      /*data: {
          message: req.params.id
      }*/
    })

    res.json(response)

  } catch (e) {
    res.json({ error: e.message });
  }
})

// this route serves reddit user's About
app.get("/reddit/about/:username", async (req, res) => {
  try {
    let found = false;
    var result;

    // first, search redis cache for this username's About
    await redisClient.lrange('about', 0, 4, async function (err, redisHistory) {
      if (err) {
        res.status(500).send(error.message);
      } else {
        for (let i = 0; i < redisHistory.length; i++) {
          let obj = JSON.parse(redisHistory[i]);
          if (obj.name.toLowerCase() == req.params.username.toLowerCase()) {
            found = true;
            res.send(obj);
          }
        }
        // if user entry not found in cache, fetch data from reddit and add a new entry in cache
        if (!found) {
          try {
            result = await API_helper_Reddit.getUserAbout(req.params.username);
            await redisClient.lpush("about", JSON.stringify(result.data.data));
            ///\cite https://stackoverflow.com/a/12060069
            ///\remark How to limit redis list size
            await redisClient.ltrim("about", 0, 4); // cache only upto 5 recent entries
            res.send(result.data.data);
          } catch (error) {
            res.status(500).send(error.message);
          }
        }
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  };
});

// this route serves reddit user's comment history
app.get("/reddit/comments/:username", async (req, res) => {
  try {
    let found = false;
    var result;

    // first, search redis cache for this username's Comments
    await redisClient.lrange('comments', 0, 4, async function (err, redisHistory) {
      if (err) {
      }
      else {
        for (let i = 0; i < redisHistory.length; i++) {
          userHistory = await JSON.parse(redisHistory[i]);
          for (let j = 0; j < userHistory.length; j++) {
            let obj = userHistory[j];
            if (obj.data.author.toLowerCase() == req.params.username.toLowerCase()) {
              console.log(`User ${req.params.username} found in cache`);
              found = true;
              res.send(userHistory);
              break;
            }
          }
        }

        if (!found) {
          console.log(`User ${req.params.username} not found in cache`);
          try {
            result = await API_helper_Reddit.getUserComments(req.params.username);
            await redisClient.lpush("comments", await JSON.stringify(result));
            ///\cite https://stackoverflow.com/a/12060069
            ///\remark How to limit redis list size
            await redisClient.ltrim("comments", 0, 4); // cache only upto 5 recent entries
            res.send(result);
          } catch (error) {
          }
        }
      }
    });
  } catch (error) {
    console.log(error.message)
  };
});

// this route serves reddit user's post history
app.get("/reddit/posts/:username", async (req, res) => {
  try {
    let found = false;
    var result;

    // first, search redis cache for this username's Comments
    await redisClient.lrange('posts', 0, 4, async function (err, redisHistory) {
      if (err) {
      }
      else {
        for (let i = 0; i < redisHistory.length; i++) {
          userHistory = await JSON.parse(redisHistory[i]);
          for (let j = 0; j < userHistory.length; j++) {
            let obj = userHistory[j];
            if (obj.data.author.toLowerCase() == req.params.username.toLowerCase()) {
              console.log(`User ${req.params.username} found in cache`);
              found = true;
              res.send(userHistory);
              break;
            }
          }
        }

        if (!found) {
          console.log(`User ${req.params.username} not found in cache`);
          try {
            result = await API_helper_Reddit.getUserPosts(req.params.username);
            await redisClient.lpush("posts", await JSON.stringify(result));
            ///\cite https://stackoverflow.com/a/12060069
            ///\remark How to limit redis list size
            await redisClient.ltrim("posts", 0, 4); // cache only upto 5 recent entries
            res.send(result);
          } catch (error) {
          }
        }
      }
    });
  } catch (error) {
    console.log(error.message)
  };
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));