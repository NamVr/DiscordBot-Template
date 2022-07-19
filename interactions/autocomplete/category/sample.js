/**
 * @file Sample autocomplete interaction
 * @author Naman Vrati
 * @since 3.3.0
 * @version 3.3.0
 */

/**
 * @type {import("../../../typings").AutocompleteInteraction}
 */
module.exports = {
	name: "sample",

	async execute(interaction) {
		// Preparation for the autocomplete request.

		const focusedValue = interaction.options.getFocused();

		// Extract choices automatically from your choice array (can be dynamic too)!

		const choices = ["your", "choices"];

		// Filter choices according to user input.

		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);

		// Respond the request here.
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);

		return;
	},
};
