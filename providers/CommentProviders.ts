import DataProvider from "./DataProvider";
import { VideoID } from "./VideoProviders";
import { ChannelID } from "./ChannelProviders";

export interface CommentData {
	text: string,
	authorId: ChannelID,
	authorName: string,
	authorPictureUrl: string,
	likeCount: number,
	dislikeCount: number,
	timeAgo: string
};

export abstract class ChannelCommentsProvider extends DataProvider<ChannelID, CommentData[]> {
}

export abstract class VideoCommentsProvider extends DataProvider<VideoID, CommentData[]> {
}
