import { VideoFullData, VideoID, VideoProvider } from "../VideoProviders";

const { google } = require('googleapis');
const youtube = google.youtube('v3');

export default class YTVideoProvider extends VideoProvider {
	private apiKey: string;

	constructor(key: string) {
		super();
		this.apiKey = key;
	}

	async get(videoId: VideoID): Promise<VideoFullData> {
		const response = await youtube.videos.list({
			key: this.apiKey,
			part: 'snippet,statistics',
			id: videoId,
			maxResults: 1
		});

		const video = response.data.items[0];

		const channelStats = await youtube.channels.list({
			key: this.apiKey,
			part: 'statistics',
			fields: 'items/statistics/videoCount',
			id: video.snippet.channelId
		});

		// Surely typescript and its fancy optionals has a better way to do this?
		let tags = [];
		if (video.snippet.tags !== undefined) {
			tags = video.snippet.tags;
		}

		return {
			videoId: videoId,
			title: video.snippet.title,
			description: video.snippet.description,
			viewCount: video.statistics.viewCount,
			likeCount: video.statistics.likeCount,
			dislikeCount: 0,
			commentCount: video.statistics.commentCount,
			publishDate: new Date(video.snippet.publishedAt),
			categoryName: video.snippet.categoryId, // TODO: Get category name
			categoryId: video.snippet.categoryId,
			tags: tags,
			channelId: video.snippet.channelId,
			channelName: video.snippet.channelTitle,
			channelVideoCount: channelStats.data.items[0].statistics.videoCount
		}
	}
}
