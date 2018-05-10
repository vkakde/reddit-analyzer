# reddit-analyzer
Node application that uses the reddit API to analyze users and subreddits

# Reddit User/Subreddit Analyser

# Description: Use Reddit's API to analyse either or both (if time permits) -
1. Reddit users - Get user data, activity (posts and comments)
2. Subreddits - Get subreddit data, activity (posts and comments)

Using this data, create a summary of the user/subreddit with parameters such as comments/day, most-upvoted comment, etc. Also, render visualizations for insight into aspects like activity over dates, activity over time of day, pie chart of karma by subreddits, etc.

# Database -
Allow user to favorite a few subreddits - display a peekdown into these subreddits are localhost:3000 (peekdown: # of posts made today, # active/online users right now, etc..). User profile will also be on database - userID, hashed password, etc.

# Course technologies -
1. React
2. Redis
3. Websocket (live threads) / Workers (to monitor subreddits for new posts)

# Independent technologies -
1. Fusioncharts/d3.js (https://www.npmjs.com/package/fusioncharts) for visual representation of data fetched from API
2. SMTP for email updates of new posts/activity in subreddit
(Note from professor: “Instead of an smtp server, you may want to juse learn how to use sendgrid!”)


(inspired by http://www.snoopsnoo.com)
