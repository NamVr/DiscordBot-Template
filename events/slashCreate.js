/**
 * @file Slash Command Interaction Handler
 * @author Naman Vrati & TechyGiraffe999
 * @since 3.0.0
 * @version 3.4.0
 */
const { Collection } = require("discord.js");
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
		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isChatInputCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// Cooldowns
		const { cooldowns } = client;
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown ?? 0) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime =
				timestamps.get(interaction.user.id) + cooldownAmount;
			const timeLeft = (expirationTime - now) / 1000;
			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({
					content: `Please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${
						interaction.commandName
					}\` command.`,
					ephemeral: true,
				});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that command!",
				ephemeral: true,
			});
		}
	},
};
