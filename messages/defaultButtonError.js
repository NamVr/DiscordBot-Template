/**
 * @file Default Error Message On Error Button Interaction
 * @author NamVr
 * @since 3.0.0
 */

module.exports = {
	/**
	 * @description Executes when the button interaction could not be fetched.
	 * @author NamVr
	 * @param {Object} interaction The Interaction Object of the command.
	 */

	async execute(interaction) {
		await interaction.reply({
			content: "There was an issue while fetching this button!",
			ephemeral: true,
		});
		return;
	},
};
