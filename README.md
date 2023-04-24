# ClassicYT
*(work in progess)*

This project attempts to faithfully recreate the look and feel of 2010/2011 YouTube by bringing back functionality to archived pages from the Wayback Machine. 

Currently, only a handful of pages have been implemented, but I'd like to have all of the main pages (homepage, search, channels, etc.) to be fully functional.

## Setup
First, you'll need to create a project with [Google's API service](https://console.cloud.google.com/). Make sure to enable YouTube Data API v3. Get your API key and store it in `gapi_key.json` in the 'key' field.

Once that is set up, you'll need NodeJS to run this project. `npm run start` will start a web server on port 1234 hosting the page, or you can use `npm run devStart` for a server that reloads whenever you modify a file.

**NOTE:** Because the recommended section requires use of the search API, each load of the watch page will use over 100 quota credits per load. If you are just using the free tier, this means you will use up your API quota after 99 loads of the watch page. 