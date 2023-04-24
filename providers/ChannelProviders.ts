import DataProvider from "./DataProvider";

export type ChannelID = string;

export interface ChannelFullData {
	channelId: ChannelID
	channelTitle: string
	channelName: string
	description: string
	backgroundImageUrl: string
	headerImageUrl: string
	profileImageUrl: string
	featuredVideoId: string
	// Profile statistics
	viewCount: number
	totalUploadViewCount: number
	commentCount: number
	subscriberCount: number
	joinDate: Date
	lastVisitTimeAgo: string
	websiteUrl: string
	countryName: string
}

export interface ChannelShortData {
	channelId: ChannelID
	channelTitle: string
	description: string
	profileImageUrl: string
	videoCount: number
	viewCount: number
	subscriberCount: number
}

export abstract class ChannelProvider extends DataProvider<ChannelID, ChannelFullData> {
}
