# reddit-analyzer
Node application that analyzes Reddit user's activity

# Description
Fetch user's account info + activity (posts and comments) from Reddit.com

Using this data, 2 types of summaries of the user are output -
1. Textual summary (aggregated data)
2. Visual summary (charts)

# Environment
NPM, nodejs, mongodb, redis

# How to build
Clone/download this repository. Navigate to root and exec command "npm run build"/"yarn run build"

# How to run
Navigate to root and exec command "yarn start"

# Database -
Allow users to login. A logged in user may email herself a PDF copy of the generated report.

# Technologies used -
1. React (front-end)
2. Express (back-end)
3. Redis (cahcing data feteched from Reddit.com)
4. Workers (handle email sending)
5. Fusioncharts/d3.js (https://www.npmjs.com/package/fusioncharts) for visual representation of data fetched from API
6. NodeMailer (e-mailing framework)

(inspired by http://www.snoopsnoo.com)
