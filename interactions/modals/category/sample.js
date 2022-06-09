/**
 * @file Sample modal interaction
 * @author Naman Vrati
 * @since 3.2.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ModalInteractionCommand}
 */
module.exports = {
	id: "sample",

	async execute(interaction) {
		await interaction.reply({
			content: "This was a reply from modal handler!",
		});
		return;
	},
};
