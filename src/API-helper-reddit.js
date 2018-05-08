///\desc This file contains functions to send/recieve data from Reddit
var bluebird = require('bluebird');
var axios = bluebird.promisifyAll(require('axios'));

module.exports = {
    ///\brief This function fetches a user's About
    getUserAbout: function (username) {
        return new Promise(async (resolve, reject) => {
            console.log(`Searching for user ${username}, URL: https://www.reddit.com/user/${username}/about/.json`);
            var response = await axios.get(`https://www.reddit.com/user/${username}/about/.json`);
            if (response) {
                resolve(response);
            }
            reject(new Error("Failed to fetch data"));
        });
    },

    ///\brief This function fetches a user's entire comment history
    getUserComments: function (username, after = '') {
        return new Promise(async (resolve, reject) => {
            var response = await axios.get(`https://www.reddit.com/user/${username}/comments.json?limit=100&after=${after}`);
            let data = response.data.data.children;

            if (data) {
                // recursively fetch user's entire comment history
                try {
                    response.concat(await this.getUserComments(username, data[99].data.name));
                    resolve(response);
                } catch (error) {
                    resolve(response);
                }
            }
            else {
                reject(new Error("Data fetch failed - no more data"));
            }
        });
    }
}