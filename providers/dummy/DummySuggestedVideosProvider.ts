import { VideoShortData, VideoID, SuggestedVideosProvider } from "../VideoProviders";

export default class DummySuggestedVideosProvider extends SuggestedVideosProvider {
	async get(videoId: VideoID): Promise<VideoShortData[]> {
		return [
			{
				videoId: 'aZ98AXxtTjQ',
				title: 'Example Video #1',
				channelName: 'examplesawesome123',
				lengthString: '1:23',
				viewCount: 50001,
				timeAgo: '3 weeks ago',
				thumbnailUrl: 'https://i.ytimg.com/vi/aZ98AXxtTjQ/default.jpg'
			},
			{
				videoId: 'mc_Ys6AoaXU',
				title: 'Example Video #2',
				channelName: 'examplesawesome123',
				lengthString: '1:23',
				viewCount: 50002,
				timeAgo: '3 weeks ago',
				thumbnailUrl: 'https://i.ytimg.com/vi/mc_Ys6AoaXU/default.jpg'
			},
			{
				videoId: 'Zr7wNQw12l8',
				title: 'Example Video #3',
				channelName: 'examplesawesome123',
				lengthString: '1:23',
				viewCount: 50004,
				timeAgo: '3 weeks ago',
				thumbnailUrl: 'https://i.ytimg.com/vi/Zr7wNQw12l8/default.jpg'
			},
		]
	}
}
