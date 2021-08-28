/**
 * @file Sample Select-Menu interaction
 * @author Naman Vrati
 * @since 3.0.0
 */

module.exports = {
	id: "sample",

	/**
	 * @description Executes when a select menu option with ID "sample" is clicked.
	 * @author Naman Vrati
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "This was a reply from select menu handler!",
		});
		return;
	},
};
