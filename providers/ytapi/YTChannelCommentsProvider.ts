import { CommentData, ChannelCommentsProvider } from "../CommentProviders";
import { ChannelID } from "../ChannelProviders";

const { google } = require('googleapis');
const youtube = google.youtube('v3');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

TimeAgo.addDefaultLocale(en);
const timeAgoFormatter = new TimeAgo();

export default class YTChannelCommentsProvider extends ChannelCommentsProvider {
	private apiKey: string;

	constructor(key: string) {
		super();
		this.apiKey = key;
	}

	async get(channelId: ChannelID): Promise<CommentData[]> {
		var results: CommentData[] = [];
		
		// NOTE: YouTube's API doesn't support 'channel comments' anymore, 
		//       so we use comment threads related to the channel instead.
		const response = await youtube.commentThreads.list({
			key: this.apiKey,
			part: 'snippet',
			allThreadsRelatedToChannelId: channelId,
			maxResults: 10,
			textFormat: 'plainText'
		});

		// TODO: Handle errors (e.g. disabled comments)

		response.data.items.forEach((commentThread: any) => {
			const comment = commentThread.snippet.topLevelComment;
			results.push({
				text: comment.snippet.textDisplay,
				authorId: comment.snippet.authorChannelId,
				authorName: comment.snippet.authorDisplayName,
				authorPictureUrl: comment.snippet.authorProfileImageUrl,
				likeCount: comment.snippet.likeCount,
				dislikeCount: 0,
				timeAgo: timeAgoFormatter.format(new Date(comment.snippet.publishedAt))
			});
		});

		return results;
	}
}
