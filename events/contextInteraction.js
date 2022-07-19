/**
 * @file Context Interaction Handler
 * @author Krish Garg & Naman Vrati
 * @since 3.0.0
 * @version 3.2.2
 */

const {
	InteractionType,
	ApplicationCommandType,
} = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').ContextMenuInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	execute: async (interaction) => {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a context interaction (to prevent weird bugs)

		if (interaction.type !== InteractionType.ApplicationCommand) return;

		if (
			interaction.commandType !== ApplicationCommandType.Message &&
			interaction.commandType !== ApplicationCommandType.User
		)
			return;

		/**********************************************************************/

		// Checks if the interaction target was a user

		if (interaction.commandType === ApplicationCommandType.User) {
			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);

			// A try to execute the interaction.

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that context command!",
					ephemeral: true,
				});
				return;
			}
		}
		// Checks if the interaction target was a user
		else if (interaction.commandType === ApplicationCommandType.Message) {
			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			// A try to execute the interaction.

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that context command!",
					ephemeral: true,
				});
				return;
			}
		}

		// Practically not possible, but we are still caching the bug.
		// Possible Fix is a restart!
		else {
			return console.log(
				"Something weird happening in context menu. Received a context menu of unknown type."
			);
		}
	},
};
