import { ChannelCommentsProvider, CommentData } from "../CommentProviders";

export default class DummyChannelCommentsProvider extends ChannelCommentsProvider {
	async get(channelId: string): Promise<CommentData[]> {
		return [
			{
				text: 'yup i agree its awesome',
				authorId: 'rgaieorhgorehag',
				authorName: 'happyguy',
				authorPictureUrl: 'https://yt3.ggpht.com/ytc/AGIKgqMuNiEPBn7dDKKwbSBUY3TITH45a5KzLCwAhxkL=s88-c-k-c0x00ffffff-no-rj',
				likeCount: 0,
				dislikeCount: 3,
				timeAgo: '3 hours ago'
			},
			{
				text: 'Wow this channel is fantastic and wonderful!',
				authorId: 'rgaieorhgorehag',
				authorName: 'happyguy',
				authorPictureUrl: 'https://yt3.ggpht.com/ytc/AGIKgqMuNiEPBn7dDKKwbSBUY3TITH45a5KzLCwAhxkL=s88-c-k-c0x00ffffff-no-rj',
				likeCount: 12,
				dislikeCount: 3,
				timeAgo: '4 hours ago'
			}
		]
	}
}
