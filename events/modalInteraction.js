/**
 * @file Modal Interaction Handler
 * @author Naman Vrati
 * @since 3.2.0
 * @version 3.3.2
 */

const { Events } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').Interaction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a modal interaction (to prevent weird bugs)

		if (!interaction.isModalSubmit()) return;

		const command = client.modalCommands.get(interaction.customId);

		// If the interaction is not a command in cache, return error message.
		// You can modify the error message at ./messages/defaultModalError.js file!

		if (!command) {
			return await require("../messages/defaultModalError").execute(interaction);
		}

		// A try to execute the interaction.

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while understanding this modal!",
				ephemeral: true,
			});
		}
	},
};
