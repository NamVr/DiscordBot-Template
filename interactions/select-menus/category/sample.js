/**
 * @file Sample Select-Menu interaction
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').SelectInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		await interaction.reply({
			content: "This was a reply from select menu handler!",
		});
		return;
	},
};
