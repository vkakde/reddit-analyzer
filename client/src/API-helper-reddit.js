///\desc This file contains functions to send/recieve data from Reddit
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
    },

    // Scans for the most upvotes to most downvotes posts/comments in just one loop O(n)
    getVotesStats: function(results){

        var most_upvotes = 0,most_downvotes = results[0].data.downs;
        var most_upvoted_comment = {}
        var most_downvoted_comment = results[0].data

        results.forEach(element => {
                if(element.data.ups > most_upvotes){
                    most_upvotes = element.data.ups
                    most_upvoted_comment = element.data
                }
                
                if(element.data.downs < most_downvotes){
                  most_downvotes = element.data.downs
                  console.log("Downvotes was updated with "+most_downvotes)
                  most_downvoted_comment = element.data
                }
        });
        console.log("Most downvotes are "+most_downvotes)

        return {upvoted: most_upvoted_comment, downvoted: most_downvoted_comment}
    }
}