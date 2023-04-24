import { ChannelUploadsProvider, SuggestedVideosProvider, VideoProvider, VideoShortData } from "../providers/VideoProviders";
import { VideoCommentsProvider } from "../providers/CommentProviders";

import { Request, Response } from "express";

const { DOMImplementation, XMLSerializer } = require('xmldom');
const ejs = require('ejs');

export default class WatchPageController {
	private mainVideoProvider: VideoProvider;
	private suggestionsProvider: SuggestedVideosProvider;
	private commentsProvider: VideoCommentsProvider;
	private topCommentsProvider: VideoCommentsProvider;
	private channelUploadsProvider: ChannelUploadsProvider;

	constructor(video: VideoProvider, suggestions: SuggestedVideosProvider, comments: VideoCommentsProvider, topComments: VideoCommentsProvider, uploads: ChannelUploadsProvider)  {
		this.mainVideoProvider = video;
		this.suggestionsProvider = suggestions;
		this.commentsProvider = comments;
		this.topCommentsProvider = topComments;
		this.channelUploadsProvider = uploads;
	}

	handleWatchPage(req: Request, res: Response) {
		// TODO: Display errors if the given video id is missing or invalid.
		const videoId: string = req.query.v!.toString();
		Promise.all([
			this.mainVideoProvider.get(videoId),
			this.commentsProvider.get(videoId),
			this.topCommentsProvider.get(videoId)
		]).then(data => {
			this.suggestionsProvider.get(data[0]).then(suggestions => {
				res.render('watch.ejs', {
					video: data[0],
					suggestions: suggestions,
					comments: data[1],
					topComments: data[2]
				});
			})
		});
	}
	
	handleWatchAjax(req: Request, res: Response) {
		if (req.query.action_channel_videos == '1') {
			this.channelUploadsProvider.get(req.query.user!.toString()).then((uploads: VideoShortData[]) => {
				ejs.renderFile('./views/ajax/watch-more-from-user.ejs', { videos: uploads }, {}, (err: string, str: string) => {
					if (err) {
						console.error(err);
						res.status(500);
						res.send(err);
					} else {
						var xmlDoc = new DOMImplementation().createDocument();
						var rootTag = xmlDoc.createElement('root');
						xmlDoc.appendChild(rootTag);
						
						var htmlContent = xmlDoc.createElement('html_content');
						htmlContent.appendChild(xmlDoc.createCDATASection(str));
						rootTag.appendChild(htmlContent);
			
						// Optionally add a <js_content> tag as well if needed.
			
						var returnCode = xmlDoc.createElement('return_code');
						returnCode.appendChild(xmlDoc.createTextNode('0'));
						rootTag.appendChild(returnCode);
			
						res.set('Content-Type', 'text/xml');
						res.send(new XMLSerializer().serializeToString(xmlDoc));
					}
				});
			})
		} else if (req.query.action_more_related_videos == '1') {
			this.mainVideoProvider.get(req.query.video_id!.toString()).then(video => {
				this.suggestionsProvider.get(video)
				.then((suggestions: VideoShortData[]) => {
					ejs.renderFile('./views/ajax/watch-related-videos.ejs', { suggestedVideos: suggestions }, {}, (err: string, str: string) => {
						if (err) {
							console.error(err);
							res.status(500);
							res.send(err);
						} else {
							res.set('Content-Type', 'text/json');
							res.send(JSON.stringify({ html: str }));
						}
					});
				});
			});
		} else {
			res.status(404);
			res.send('I dunno');
		}
	}
}
