///\desc This file contains functions to send/recieve data from Reddit
///\remark For any user, Reddit allows only upto 1000 of the newest comments/posts to be fetched

var bluebird = require('bluebird');
var axios = bluebird.promisifyAll(require('axios'));

module.exports = {
    ///\brief This function fetches a user's About
    getUserAbout: function (username) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(`Searching for user ${username}, URL: https://www.reddit.com/user/${username}/about/.json`);
                var response = await axios.get(`https://www.reddit.com/user/${username}/about/.json`);
            } catch (error) {
                console.log("User not found")
                reject(new Error("Failed to fetch data"));
            }
            resolve(response);
        });
    },

    ///\brief This function fetches a user's entire comment history
    ///\remark Fetching is done recursively. Only 100 comments can be fetched at a go.
    getUserComments: function (username, after = '') {
        return new Promise(async (resolve, reject) => {
            var response = await axios.get(`https://www.reddit.com/user/${username}/comments.json?limit=100&after=${after}`);
            let data = response.data.data.children;

            if (data.length < 100) {
                resolve(data);
            }

            else if (data.length === 100) {
                // recursively fetch user's entire comment history
                resolve(data.concat(await this.getUserComments(username, data[99].data.name)));
            }

            else {
                reject(new Error("Data fetch failed (Comments)"));
            }
        });
    },

    ///\brief This function fetches a user's entire post history
    ///\remark Fetching is done recursively. Only 100 posts can be fetched at a go.
    getUserPosts: function (username, after = '') {
        return new Promise(async (resolve, reject) => {
            var response = await axios.get(`https://www.reddit.com/user/${username}/submitted.json?limit=100&after=${after}`);
            let data = response.data.data.children;

            if (data.length < 100) {
                resolve(data);
            }

            else if (data.length === 100) {
                // recursively fetch user's entire post history
                resolve(data.concat(await this.getUserPosts(username, data[99].data.name)));
            }

            else {
                reject(new Error("Data fetch failed (Posts)"));
            }
        });
    }

    /*getUserUpvoted: function (username) {
        return new Promise(async(resolve, reject) => {

            var response = await axios.get(`https://www.reddit.com/user/${username}/overview/.json`);
            //console.log('User overview response '+JSON.stringify(response))

            if(response)
                resolve(response)
            else
                reject(new Error("Failed to fetch upvotes")) 

        })
    }*/
}