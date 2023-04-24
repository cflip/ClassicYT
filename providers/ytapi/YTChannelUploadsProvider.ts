import { ChannelID } from "../ChannelProviders";
import { ChannelUploadsProvider, VideoShortData } from "../VideoProviders";

const { google } = require('googleapis');
const youtube = google.youtube('v3');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
TimeAgo.addDefaultLocale(en);
const timeAgoFormatter = new TimeAgo();

export default class YTChannelUploadsProvider extends ChannelUploadsProvider {
	private apiKey: string;

	constructor(key: string) {
		super();
		this.apiKey = key;
	}

	async get(channelId: ChannelID): Promise<VideoShortData[]> {
		let results: VideoShortData[] = [];

		const channelRes = await youtube.channels.list({
			key: this.apiKey,
			part: 'contentDetails',
			fields: 'items/contentDetails/relatedPlaylists/uploads',
			id: channelId,
			maxResults: 1
		});
		const uploadsPlaylistId = channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

		const response = await youtube.playlistItems.list({
			key: this.apiKey,
			part: 'snippet',
			playlistId: uploadsPlaylistId,
			maxResults: 20
		});

		response.data.items.forEach((video: any) => {
			results.push({
				videoId: video.snippet.resourceId.videoId,
				title: video.snippet.title,
				channelName: video.snippet.videoOwnerChannelTitle,
				lengthString: '0:00',
				viewCount: 301,
				timeAgo: timeAgoFormatter.format(new Date(video.snippet.publishedAt)),
				thumbnailUrl: video.snippet.thumbnails.default.url,
			});
		});

		return results;
	}
}
