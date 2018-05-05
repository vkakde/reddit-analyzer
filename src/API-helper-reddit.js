///\desc This file contains functions to send/recieve data from Reddit
var bluebird = require('bluebird');
var axios = bluebird.promisifyAll(require('axios'));

module.exports = {
    ///\brief This function fetches a user's overview
    getUserOverview : function(username) {
        return new Promise(async (resolve, reject) => {
            console.log(`Searching for user ${username}, URL: https://www.reddit.com/user/${username}/about/.json`);
            var response = await axios.get(`https://www.reddit.com/user/${username}/about/.json`);
            if(response){
                    resolve(response);
            }
            reject(new Error("Failed to fetch data"));
        });
    }
}