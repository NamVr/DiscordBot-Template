/**
 * @file Sample Message Context Menu interaction
 * @author Krish Garg
 * @since 3.0.0
 */

module.exports = {
	data: {
		name: "sample",
		type: 3, // 3 is for message context menus
	},

	/**
	 * @description Executes when the context option with name "sample" is clicked.
	 * @author Krish Garg
	 * @param {import("discord.js").ContextMenuInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "I am a sample message context menu.",
		});
		return;
	},
};
