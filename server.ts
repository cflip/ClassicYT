import UserPageController from "./controllers/UserPageController";
import WatchPageController from "./controllers/WatchPageController";

// import DummyChannelProvider from "./providers/dummy/DummyChannelProvider";
// import DummyChannelUploadsProvider from "./providers/dummy/DummyChannelUploadsProvider";
// import DummyChannelCommentsProvider from "./providers/dummy/DummyChannelCommentsProvider";
// import DummyVideoProvider from "./providers/dummy/DummyVideoProvider";
// import DummySuggestedVideosProvider from "./providers/dummy/DummySuggestedVideosProvider";
// import DummyVideoCommentsProvider from "./providers/dummy/DummyVideoCommentsProvider";

import YTChannelProvider from "./providers/ytapi/YTChannelProvider";
import YTChannelUploadsProvider from "./providers/ytapi/YTChannelUploadsProvider";
import YTChannelCommentsProvider from "./providers/ytapi/YTChannelCommentsProvider";
import YTVideoProvider from "./providers/ytapi/YTVideoProvider";
import YTSuggestedVideosProvider from "./providers/ytapi/YTSuggestedVideosProvider";
import { YTVideoCommentsProvider, YTVideoTopCommentsProvider } from "./providers/ytapi/YTVideoCommentsProvider";

const express = require('express');
const app = express();

const apiKey = require('./gapi_key.json').key;

// const channel = new DummyChannelProvider();
// const uploads = new DummyChannelUploadsProvider();
// const channelComm = new DummyChannelCommentsProvider();

// const video = new DummyVideoProvider();
// const suggestions = new DummySuggestedVideosProvider();
// const vidComm = new DummyVideoCommentsProvider();
// const topComm = new DummyVideoCommentsProvider();

const channel = new YTChannelProvider(apiKey);
const uploads = new YTChannelUploadsProvider(apiKey);
const channelComm = new YTChannelCommentsProvider(apiKey);

const video = new YTVideoProvider(apiKey);
const suggestions = new YTSuggestedVideosProvider(apiKey);
const vidComm = new YTVideoCommentsProvider(apiKey);
const topComm = new YTVideoTopCommentsProvider(apiKey);

const userController = new UserPageController(channel, uploads, channelComm);
const watchController = new WatchPageController(video, suggestions, vidComm, topComm, uploads);

app.set('view-engine', 'ejs');
app.use(express.static('public'));

app.get('/watch', watchController.handleWatchPage.bind(watchController));
app.get('/watch_ajax', watchController.handleWatchAjax.bind(watchController));

app.get('/results', async (req: any, res: any) => {
	/*
	const query = req.query.search_query;

	const searchRes = await youtube.search.list({
		key: apiKey,
		type: 'video',
		part: 'snippet',
		q: `${query} before:2012`,
		maxResults: 20
	});

	// TODO: The part of the title string that matches the query string should be bolded.
	var results: SearchResultVideoData[] = [];
	searchRes.data.items.forEach((vid: any) => {
		results.push({
			videoId: vid.id.videoId,
			title: vid.snippet.title,
			channelId: vid.snippet.channelId,
			channelName: vid.snippet.channelTitle,
			viewsString: `42,069 views`,
			thumbnailUrl: vid.snippet.thumbnails.default.url,
			timeAgo: "some time ago"
		});
	});

	res.render('results.ejs', { 
		query: query, 
		totalResults: 1234,
		results: results 
	});
	*/
	res.send("WORK IN PROGRESS!!!!");
});

app.get('/user/:id', userController.handleUserPage.bind(userController));

app.listen(1234);
