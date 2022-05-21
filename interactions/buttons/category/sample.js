/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 */

module.exports = {
	id: "sample",

	/**
	 * @description Executes when the button with ID "sample" is clicked.
	 * @author Naman Vrati
	 * @param {import("discord.js").ButtonInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "This was a reply from button handler!",
		});
		return;
	},
};
