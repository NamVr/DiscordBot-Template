/**
 * @file Sample button interaction
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
 */
module.exports = {
	id: "sample-[id]", //set the customid to the button to sample-[id you want] to then get it here.

	async execute(interaction) {
		await interaction.reply({
			content: `This was a reply from button handler with the id ${interaction.args.id}!`,
		});
		return;
	},
};
