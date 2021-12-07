/**
 * @file Meme command
 * @author LightningBolt
 * @since 3.0.1
 */
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
	name: "meme",
        description: 'Get a random meme!',

	/**
	 * @description Executes when the command is called by command handler.
	 * @author LightningBolt
	 * @param {Object} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	async execute(message, args) {
		message.channel.sendTyping()
                const embed = new MessageEmbed();
		let subrrs = [
			"memes",
			"dankmemes",
			"me_irl",
			"funny",
			"wholesomememes",
		];
		let subrr = subrrs[Math.floor(Math.random() * subrrs.length)];
		let response = await fetch(
			`https://www.reddit.com/r/${subrr}/random/.json`
		);
		let content = await response.json();

		let permalink = content[0].data.children[0].data.permalink;
		let memeUrl = `https://reddit.com${permalink}`;
		let memeImage = content[0].data.children[0].data.url;
		let memeTitle = content[0].data.children[0].data.title;
		let memeUpvotes = content[0].data.children[0].data.ups;
		let memeDownvotes = content[0].data.children[0].data.downs;
		let memeNumComments = content[0].data.children[0].data.num_comments;
		embed.setTitle(`${memeTitle}`);
		embed.setURL(`${memeUrl}`);
		embed.setImage(memeImage);
		embed.setColor("RANDOM");
		embed.setFooter(
			`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
		);
		message.channel.send({ embeds: [embed]});

	},
};
