/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(
			"List all commands of bot or info about a specific command."
		)
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The specific command to see the info of.")
		),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let name = interaction.options.getString("command");

		/**
		 * @type {EmbedBuilder}
		 * @description Help command's embed
		 */
		const helpEmbed = new EmbedBuilder().setColor("Random");

		if (name) {
			name = name.toLowerCase();

			// If a single command has been asked for, send only this command's help.

			helpEmbed.setTitle(`Help for \`${name}\` command`);

			if (interaction.client.slashCommands.has(name)) {
				const command = interaction.client.slashCommands.get(name);

				if (command.data.description)
					helpEmbed.setDescription(
						command.data.description + "\n\n**Parameters:**"
					);
			} else {
				helpEmbed
					.setDescription(`No slash command with the name \`${name}\` found.`)
					.setColor("Red");
			}
		} else {
			// Give a list of all the commands

			helpEmbed
				.setTitle("List of all my slash commands")
				.setDescription(
					"`" +
						interaction.client.slashCommands
							.map((command) => command.data.name)
							.join("`, `") +
						"`"
				);
		}

		// Replies to the interaction!

		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};
