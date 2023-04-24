import { VideoFullData, VideoID, VideoProvider } from "../VideoProviders";

export default class DummyVideoProvider extends VideoProvider {
	async get(videoId: VideoID): Promise<VideoFullData> {
		return {
			videoId: videoId,
			title: 'Example Video',
			description: 'This video is an example, and is not in fact a real video.',
			viewCount: 123456,
			likeCount: 1000,
			dislikeCount: 100,
			commentCount: 70,
			publishDate: new Date(2010, 5, 12),
			categoryName: 'Examples',
			categoryId: 'fake',
			tags: [ 'example', 'hello' ],
			channelId: 'eroghreoiuagher;jkghro;g',
			channelName: 'Example videos',
			channelVideoCount: 28
		}
	}
}
