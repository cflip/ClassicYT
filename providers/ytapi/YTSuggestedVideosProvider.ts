import { SuggestedVideosProvider, VideoID, VideoShortData } from "../VideoProviders";

const { google } = require('googleapis');
const youtube = google.youtube('v3');

const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

TimeAgo.addDefaultLocale(en);
const timeAgoFormatter = new TimeAgo();

export default class YTSuggestedVideosProvider extends SuggestedVideosProvider {
	private apiKey: string;

	constructor(key: string) {
		super();
		this.apiKey = key;
	}

	async get(videoId: VideoID): Promise<VideoShortData[]> {
		var results: VideoShortData[] = [];
	
		// TODO: Using the search API is expensive, I need to come up with a better way to suggest videos without it.
		const response = await youtube.search.list(this.makeSuggestionsSearchRequest(videoId, new Date(2011), []));
	
		response.data.items.forEach((vid: any) => {
			results.push({
				videoId: vid.id.videoId,
				title: vid.snippet.title,
				channelName: vid.snippet.channelTitle,
				lengthString: '0:00',
				viewCount: 123456,
				timeAgo: timeAgoFormatter.format(new Date(vid.snippet.publishedAt)),
				thumbnailUrl: vid.snippet.thumbnails.default.url,
			});
		});
	
		return results;
	}
	
	/**
	 * Builds and returns a request to be given to YouTube's search:list API to
	 * find a list of recommended videos that is 'era-appropriate.'
	 * 
	 * @param videoId The ID of the current video.
	 * @param videoDate A Date object containing current video's publish date.
	 * @param videoTags A list of tags relevant to the current video.
	 */
	private makeSuggestionsSearchRequest(videoId: VideoID, videoDate: Date, videoTags: string[]) {
		const NUM_RESULTS = 18;
		const NUM_SEARCH_TAGS = 10;

		var yearLater = videoDate;
		yearLater.setFullYear(videoDate.getFullYear() + 1);

		// If the video doesn't have tags, just use Youtube's default suggestions.
		if (videoTags.length == 0) {
			return {
				key: this.apiKey,
				type: 'video',
				part: 'snippet',
				relatedToVideoId: videoId,
				publishedBefore: yearLater.toISOString(),
				maxResults: NUM_RESULTS
			};
		}

		// If we do have tags, we look for suggested videos by searching the first
		// few tags and filtering the videos to be no more than a year newer.

		// TODO: Because tags can sometimes be multiple words, it might be better to limit the number of words instead.
		var numTagsToSearch = Math.min(videoTags.length, NUM_SEARCH_TAGS);

		var searchString = "";
		for (var i = 0; i < numTagsToSearch; i++) {
			searchString += videoTags[i] + ' ';
		}

		console.log(searchString);

		return {
			key: this.apiKey,
			type: 'video',
			part: 'snippet',
			q: searchString,
			publishedBefore: yearLater.toISOString(),
			maxResults: NUM_RESULTS
		};
	}
}
