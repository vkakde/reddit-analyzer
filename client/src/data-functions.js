///\desc This file contains functions to operate on user data fetched from reddit
var bluebird = require('bluebird');

module.exports = {
    // Scans for the most upvotes to most downvotes posts/comments in just one loop O(n)
    getVotesStats: function(results){

        var most_upvotes = 0,most_downvotes = results[0].data.downs;
        var most_upvoted_comment = {}
        var most_downvoted_comment = results[0].data
        var upvote_counts = 0;

        results.forEach(element => {
            var currentUpvotes = element.data.ups
            upvote_counts+= currentUpvotes;

            if(currentUpvotes > most_upvotes){
                most_upvotes = currentUpvotes
                most_upvoted_comment = element.data
            }
            
            if(element.data.downs < most_downvotes){
              most_downvotes = element.data.downs
              console.log("Downvotes was updated with "+most_downvotes)
              most_downvoted_comment = element.data
            }    
        });
        
        console.log("Most downvotes are "+most_downvotes)

        return {    upvoted: most_upvoted_comment, 
                    downvoted: most_downvoted_comment,
                    avg_karma: Math.round(upvote_counts/results.length)    }
    }
}