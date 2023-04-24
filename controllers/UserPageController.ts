import { ChannelUploadsProvider } from "../providers/VideoProviders";
import { ChannelCommentsProvider } from "../providers/CommentProviders";
import { ChannelProvider } from "../providers/ChannelProviders";

import { Request, Response } from "express";

export default class UserPageController {
	private channelProvider: ChannelProvider;
	private uploadsProvider: ChannelUploadsProvider;
	private commentsProvider: ChannelCommentsProvider;

	constructor(channel: ChannelProvider, uploads: ChannelUploadsProvider, comments: ChannelCommentsProvider) {
		this.channelProvider = channel;
		this.uploadsProvider = uploads;
		this.commentsProvider = comments;
	}
	
	handleUserPage(req: Request, res: Response) {
		let channelId: string = req.params.id;
		Promise.all([
			this.channelProvider.get(channelId),
			this.uploadsProvider.get(channelId),
			this.commentsProvider.get(channelId),
		]).then(data => {
			res.render('user.ejs', {
				channel: data[0],
				uploads: data[1],
				comments: data[2],
				subscribers: []
			});
		});
	}
}
