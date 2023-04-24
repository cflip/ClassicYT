import { ChannelFullData, ChannelProvider } from "../ChannelProviders";

export default class DummyChannelProvider extends ChannelProvider {
	async get(channelId: string): Promise<ChannelFullData> {
		return {
			channelId: 'rioghoiagihaerg',
			channelTitle: 'Examples & Cool Stuff',
			channelName: 'ExampleUser43',
			description: 'This is a fake channel, nothing on it is real in any way.',
			backgroundImageUrl: '',
			headerImageUrl: '',
			profileImageUrl: 'https://yt3.googleusercontent.com/ytc/AGIKgqMgQKlNBoz_mFmshxd0CQlpXoQc0I1wvM3kgL-RZA=s176-c-k-c0x00ffffff-no-rj',
			featuredVideoId: 'Sc8un81k8fo',
			viewCount: 12345678,
			totalUploadViewCount: 654321,
			commentCount: 55,
			subscriberCount: 99,
			joinDate: new Date(2012, 12, 20),
			lastVisitTimeAgo: '2 months ago',
			websiteUrl: 'https://example.com',
			countryName: 'Poland'
		}
	}
}
