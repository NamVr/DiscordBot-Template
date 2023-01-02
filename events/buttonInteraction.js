/**
 * @file Button Interaction Handler
 * @author Naman Vrati
 * @since 3.0.0
 * @version 3.3.1
 */

const { InteractionType, ComponentType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').ButtonInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a button interaction (to prevent weird bugs)
		
		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId);

		// If the interaction is not a command in cache, return error message.
		// You can modify the error message at ./messages/defaultButtonError.js file!

		if (!command) {
			await require("../messages/defaultButtonError").execute(interaction);
			return;
		}

		// A try to execute the interaction.

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that button!",
				ephemeral: true,
			});
			return;
		}
	},
};
