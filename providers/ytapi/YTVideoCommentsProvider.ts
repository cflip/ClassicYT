import { youtube_v3 } from "googleapis";
import { CommentData, VideoCommentsProvider } from "../CommentProviders";
import { VideoID } from "../VideoProviders";

const { google } = require('googleapis');
const youtube = google.youtube('v3');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

TimeAgo.addDefaultLocale(en);
const timeAgoFormatter = new TimeAgo();

abstract class YTAbstractVideoCommentsProvider extends VideoCommentsProvider {
	protected apiKey: string;

	constructor(key: string) {
		super();
		this.apiKey = key;
	}

	abstract getRequestData(videoId: VideoID): youtube_v3.Params$Resource$Commentthreads$List;

	async get(videoId: VideoID): Promise<CommentData[]> {
		var results: CommentData[] = [];

		let response;
		try {
			response = await youtube.commentThreads.list(this.getRequestData(videoId));
		} catch (err) {
			console.error('Unable to retrieve comments for video', videoId);
			return [];
		}

		response.data.items.forEach((commentThread: any) => {
			const comment = commentThread.snippet.topLevelComment;
			results.push({
				text: comment.snippet.textDisplay,
				authorId: comment.snippet.authorChannelId.value,
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

export class YTVideoCommentsProvider extends YTAbstractVideoCommentsProvider {
	constructor(key: string) {
		super(key);
	}

	getRequestData(videoId: VideoID): youtube_v3.Params$Resource$Commentthreads$List {
		return {
			key: this.apiKey,
			part: ['snippet'],
			videoId: videoId,
			maxResults: 10,
			textFormat: 'plainText'
		}
	}
}

export class YTVideoTopCommentsProvider extends YTAbstractVideoCommentsProvider {
	constructor(key: string) {
		super(key);
	}

	getRequestData(videoId: VideoID): youtube_v3.Params$Resource$Commentthreads$List {
		return {
			key: this.apiKey,
			part: ['snippet'],
			order: 'relevance',
			videoId: videoId,
			maxResults: 2,
			textFormat: 'plainText'
		}
	}
}
