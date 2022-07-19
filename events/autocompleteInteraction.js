/**
 * @file Autocomplete Interaction Handler
 * @author Naman Vrati
 * @since 3.3.0
 * @version 3.3.0
 */

const { InteractionType } = require("discord-api-types/v9");

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

		// Checks if the interaction is a request (to prevent weird bugs)

		if (interaction.type === InteractionType.ApplicationCommandAutocomplete)
			return;

		// Checks if the request is available in our code.

		const request = client.autocompleteInteractions.get(
			interaction.commandName
		);

		// If the interaction is not a request in cache.

		if (!request) return;

		// A try to executes the interaction.

		try {
			await request.execute(interaction);
		} catch (err) {
			console.error(err);
		}

		return;
	},
};
