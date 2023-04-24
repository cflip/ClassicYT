import DataProvider from "./DataProvider";
import { ChannelID } from "./ChannelProviders";

export type VideoID = string;

export interface VideoFullData {
	videoId: VideoID
	title: string
	description: string
	viewCount: number
	likeCount: number
	dislikeCount: number
	commentCount: number
	publishDate: Date
	categoryName: string
	categoryId: string
	tags: string[]
	channelId: ChannelID
	channelName: string
	channelVideoCount: number
}

export interface VideoShortData {
	videoId: VideoID
	title: string
	channelName: string
	lengthString: string // In the format of 1:23
	viewCount: number
	timeAgo: string
	thumbnailUrl: string
};

export abstract class VideoProvider extends DataProvider<VideoID, VideoFullData> {
}

export abstract class SuggestedVideosProvider extends DataProvider<VideoID, VideoShortData[]> {
}

export abstract class ChannelUploadsProvider extends DataProvider<ChannelID, VideoShortData[]> {
}
