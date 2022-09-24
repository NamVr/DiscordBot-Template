/**
 * @file Autocomplete Interaction Handler
 * @author Naman Vrati
 * @since 3.3.0
 * @version 3.3.1
 */
module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').AutocompleteInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is an autocomplete interaction (to prevent weird bugs)

		if (!interaction.isAutocomplete()) return;

		// Checks if the request is available in our code.

		const request = client.autocompleteInteractions.get(
			interaction.commandName
		);

		// If the interaction is not a request in cache return.

		if (!request) return;

		// A try to execute the interaction.

		try {
			await request.execute(interaction);
		} catch (err) {
			console.error(err);
		}

		return;
	},
};
