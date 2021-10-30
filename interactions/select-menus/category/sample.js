/**
 * @file Sample Select-Menu interaction
 * @author NamVr
 * @since 3.0.0
 */

module.exports = {
	id: "sample",

	/**
	 * @description Executes when a select menu option with ID "sample" is clicked.
	 * @author NamVr
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "This was a reply from select menu handler!",
		});
		return;
	},
};
