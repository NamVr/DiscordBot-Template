/**
 * @file Sample help command with slash command.
 * @author Naman Vrati
 * @author Thomas Fournier <thomas@artivain.com>
 * @since 3.0.0
 * @version 3.1.0
 */

// Deconstructed the constants we need in this file.

const { MessageEmbed, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

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

	/**
	 * @description Executes when the interaction is called by interaction handler.
	 * @author Naman Vrati
	 * @author Thomas Fournier <thomas@artivain.com>
	 * @param {*} interaction The interaction object of the command.
	 */

	async execute(interaction) {
		/**
		 * @type {Collection}
		 * @description Collection of all slash commands
		 */
		const commands = interaction.client.slashCommands;

		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let name = interaction.options.getString("command");

		/**
		 * @type {MessageEmbed}
		 * @description Help command's embed
		 */
		const helpEmbed = new MessageEmbed()
			.setColor(0x4286f4)

		if (name) {
			name = name.toLowerCase();
			// If a single command has been asked for, send only this command's help.
			// Added in version 3.1.0
			helpEmbed.setTitle(`Help for \`${name}\` command`);
			if (commands.has(name)) {
				/**
				 * @type {SlashCommandBuilder}
				 * @description The command data
				 */
				const command = commands.get(name).data;
				if (command.description) helpEmbed.setDescription(command.description + "\n\n**Parameters:**");
				command.options.forEach(option => {
					let content = option.description;
					if (option.choices) {
						let choices = "\nChoices: ";
						option.choices.forEach(choice => choices += choice + ", ");
						choices = choices.slice(0, -2);
						content += choices;
					};
					if (!option.required) content += "\n*Optional*";
					helpEmbed.addField(option.name, content.trim(), true);
				});
			} else {
				helpEmbed.setDescription(`No slash command with the name \`${name}\` found.`).setColor("YELLOW");
			};
		} else {
			// Give a list of all the commands
			helpEmbed
				.setTitle("List of all my slash commands")
				.setDescription(
					"`" + commands.map((command) => command.data.name).join("`, `") + "`"
				);
		};

		// Replies to the interaction!

		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};
