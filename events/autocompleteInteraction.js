/**
 * @file Slash Command Interaction Handler
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

 module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').CommandInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a autocomplete (to prevent weird bugs)

		if (!interaction.isAutocomplete()) return;

		const command = client.slashCommands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// If the interaction doesn't have autocomplete method.

		if (!command.autocomplete) return;

		// A try to executes the interaction.

		try {
			await command.autocomplete(interaction);
		} catch (err) {
			console.error(err);
		}
	},
};
