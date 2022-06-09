/**
 * @file Default Error Message On Error Modal Interaction
 * @author Naman Vrati
 * @since 3.2.0
 */

module.exports = {
	/**
	 * @description Executes when the modal interaction could not be fetched.
	 * @author Naman Vrati
	 * @param {import('discord.js').ModalSubmitInteraction} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "There was an issue while fetching this modal!",
			ephemeral: true,
		});
		return;
	},
};
