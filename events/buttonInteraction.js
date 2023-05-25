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

	execute(interaction) {
		// Deconstructed client from interaction object.
		return new Promise(async (resolve, reject) => {
			const { client } = interaction;

			// Checks if the interaction is a button interaction (to prevent weird bugs)

			if (!interaction.isButton()) return;

			const commands = client.buttonCommands;
			const regex = /\[(.*?)\]/g; // Regular expression to match values between square bracket
			const valueNameRegex = /\[([^\[\]]+)\]/; // Return the value of the arg. ex: [id] => id
			const commandArgs = interaction.customId.split("-"); // Return all the args of the command
			const commandName = commandArgs[0];
			commandArgs.shift();
			let FoundCommand = false;
			for (let i = 0; i < commands.size; i++) {
				const command = commands.at(i);
				const args = command.id.split("-");
				const name = args[0];
				args.shift();
				if (commandName !== name) continue; // If the checked command is not the same as the executed one, continue.
				FoundCommand = true;
				let ArgsObject = {};
				args.forEach(async (value, index) => {
					const match = value.match(valueNameRegex)[1];
					let commandValue;
					try {
						commandValue = commandArgs[index].match(valueNameRegex)[1]; // Find the value from the index.
					} catch (e) {
						commandValue = null;
					}
					ArgsObject = {
						...ArgsObject,
						...{ [match]: commandValue },
					};
				});
				interaction.args = ArgsObject;
				try {
					await command.execute(interaction);
					resolve();
				} catch (err) {
					console.error(err);
					await interaction.reply({
						content: "There was an issue while executing that button!",
						ephemeral: true,
					});
					resolve();
				}
			}
			if (!FoundCommand) {
				await interaction.reply({
					content: "The id for the button was not found.", //If the for loop finished without find a match for the id it sends an error message.
					ephemeral: true,
				});
			}
		});
	},
};
