/**
 * @file Sample modal interaction
 * @author Naman Vrati
 * @since 3.2.0
 */

module.exports = {
	id: "sample",

	/**
	 * @description Executes when the modal with ID "sample" is submitted.
	 * @author Naman Vrati
	 * @param {import("discord.js").ModalSubmitInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "This was a reply from modal handler!",
		});
		return;
	},
};
