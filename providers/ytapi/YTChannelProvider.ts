import { ChannelFullData, ChannelID, ChannelProvider } from "../ChannelProviders";

const { google } = require('googleapis');
const youtube = google.youtube('v3');

export default class YTChannelProvider extends ChannelProvider {
	private apiKey: string;

	constructor(key: string) {
		super();
		this.apiKey = key;
	}

	async get(channelId: ChannelID): Promise<ChannelFullData> {
		const response = await youtube.channels.list({
			key: this.apiKey,
			part: 'snippet,statistics',
			id: channelId,
			maxResults: 1
		});
		const channel = response.data.items[0];

		let countryName;
		if (typeof channel.snippet.country === 'undefined') {
			countryName = 'Unknown'
		} else {
			const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
			countryName = regionNames.of(channel.snippet.country)!;
		}

		return {
			channelId: channelId,
			channelTitle: channel.snippet.title,
			channelName: channel.snippet.customUrl,
			description: channel.snippet.description,
			backgroundImageUrl: '',
			headerImageUrl: '',
			profileImageUrl: channel.snippet.thumbnails.default.url,
			featuredVideoId: '',
			viewCount: parseInt(channel.statistics.viewCount),
			totalUploadViewCount: 0,
			commentCount: 0,
			subscriberCount: parseInt(channel.statistics.subscriberCount),
			joinDate: new Date(channel.snippet.publishedAt),
			lastVisitTimeAgo: 'unknown',
			websiteUrl: 'https://example.com/',
			countryName: countryName,
		}
	}
	
}
