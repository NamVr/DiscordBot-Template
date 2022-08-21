/**
 * @file Main File of the bot, responsible for registering events, commands, interactions etc.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Declare constants which will be used throughout the bot.

const fs = require("fs");
const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, client_id, test_guild_id } = require("./config.json");

/**
 * From v13, specifying the intents is compulsory.
 * @type {import('./typings').Client}
 * @description Main Application Client */

// @ts-ignore
const client = new Client({
	// Please add all intents you need, more detailed information @ https://ziad87.net/intents/
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

init();

function init() {
	createEventHandler();

	client.commands = new Collection();
	client.slashCommands = new Collection();
	client.buttonCommands = new Collection();
	client.selectCommands = new Collection();
	client.contextCommands = new Collection();
	client.modalCommands = new Collection();
	client.cooldowns = new Collection();
	client.autocompleteInteractions = new Collection();
	client.triggers = new Collection();

	registerMessageBasedLegacyCommands();
	registerSlashCommandInteractions();
	registerAutocompleteInteractions();
	registerContextMenuInteractions();
	registerButtonCommandInteractions();
	registerModalCommandInteractions();
	registerSelectMenuInteractions();
	registerSlashCommmandsInAPI();
	registerMessageBasedChatTriggers();
}

function run() {
	// Login into your client application with bot's token.
	client.login(token);
}

function createEventHandler() {
	const eventFiles = fs
		.readdirSync("./events")
		.filter((file) => file.endsWith(".js"));

	// Loop through all files and execute the event when it is actually emmited.
	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(
				event.name,
				async (...args) => await event.execute(...args, client)
			);
		}
	}
}

function registerSlashCommandInteractions() {
	const slashCommands = fs.readdirSync("./interactions/slash");

	// Loop through all files and store slash-commands in slashCommands collection.
	for (const module of slashCommands) {
		const commandFiles = fs
			.readdirSync(`./interactions/slash/${module}`)
			.filter((file) => file.endsWith(".js"));

		for (const commandFile of commandFiles) {
			const command = require(`./interactions/slash/${module}/${commandFile}`);
			client.slashCommands.set(command.data.name, command);
		}
	}
}

function registerAutocompleteInteractions() {
	const autocompleteInteractions = fs.readdirSync("./interactions/autocomplete");

	// Loop through all files and store autocomplete interactions in autocompleteInteractions collection.
	for (const module of autocompleteInteractions) {
		const files = fs
			.readdirSync(`./interactions/autocomplete/${module}`)
			.filter((file) => file.endsWith(".js"));

		for (const interactionFile of files) {
			const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
			client.autocompleteInteractions.set(interaction.name, interaction);
		}
	}
}

function registerContextMenuInteractions() {
	const contextMenus = fs.readdirSync("./interactions/context-menus");

	// Loop through all files and store context-menus in contextMenus collection.
	for (const folder of contextMenus) {
		const files = fs
			.readdirSync(`./interactions/context-menus/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of files) {
			const menu = require(`./interactions/context-menus/${folder}/${file}`);
			const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
			client.contextCommands.set(keyName, menu);
		}
	}
}

function registerButtonCommandInteractions() {
	const buttonCommands = fs.readdirSync("./interactions/buttons");

	// Loop through all files and store button-commands in buttonCommands collection.
	for (const module of buttonCommands) {
		const commandFiles = fs
			.readdirSync(`./interactions/buttons/${module}`)
			.filter((file) => file.endsWith(".js"));

		for (const commandFile of commandFiles) {
			const command = require(`./interactions/buttons/${module}/${commandFile}`);
			client.buttonCommands.set(command.id, command);
		}
	}
}

function registerModalCommandInteractions() {
	const modalCommands = fs.readdirSync("./interactions/modals");

	// Loop through all files and store modal-commands in modalCommands collection.
	for (const module of modalCommands) {
		const commandFiles = fs
			.readdirSync(`./interactions/modals/${module}`)
			.filter((file) => file.endsWith(".js"));

		for (const commandFile of commandFiles) {
			const command = require(`./interactions/modals/${module}/${commandFile}`);
			client.modalCommands.set(command.id, command);
		}
	}
}

function registerSelectMenuInteractions() {
	const selectMenus = fs.readdirSync("./interactions/select-menus");

	// Loop through all files and store select-menus in selectMenus collection.
	for (const module of selectMenus) {
		const commandFiles = fs
			.readdirSync(`./interactions/select-menus/${module}`)
			.filter((file) => file.endsWith(".js"));
		for (const commandFile of commandFiles) {
			const command = require(`./interactions/select-menus/${module}/${commandFile}`);
			client.selectCommands.set(command.id, command);
		}
	}
}

function registerSlashCommmandsInAPI() {
	const rest = new REST({ version: "9" }).setToken(token);

	const commandJsonData = [
		...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
		...Array.from(client.contextCommands.values()).map((c) => c.data),
	];

	(async () => {
		try {
			console.log("Started refreshing application (/) commands.");

			await rest.put(
				/**
				 * By default, you will be using guild commands during development.
				 * Once you are done and ready to use global commands (which have 1 hour cache time),
				 * 1. Please uncomment the below (commented) line to deploy global commands.
				 * 2. Please comment the below (uncommented) line (for guild commands).
				 */
				Routes.applicationGuildCommands(client_id, test_guild_id),

				/**
				 * Good advice for global commands, you need to execute them only once to update
				 * your commands to the Discord API. Please comment it again after running the bot once
				 * to ensure they don't get re-deployed on the next restart.
				 */
				// Routes.applicationCommands(client_id)
				{ body: commandJsonData }
			);

			console.log("Successfully reloaded application (/) commands.");
		} catch (error) {
			console.error(error);
		}
	})();
}

function registerMessageBasedChatTriggers() {
	const triggerFolders = fs.readdirSync("./triggers");

	// Loop through all files and store triggers in triggers collection.
	for (const folder of triggerFolders) {
		const triggerFiles = fs
			.readdirSync(`./triggers/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of triggerFiles) {
			const trigger = require(`./triggers/${folder}/${file}`);
			client.triggers.set(trigger.name, trigger);
		}
	}
}

function registerMessageBasedLegacyCommands() {
	const commandFolders = fs.readdirSync("./commands");

	// Loop through all files and store commands in commands collection.
	for (const folder of commandFolders) {
		const commandFiles = fs
			.readdirSync(`./commands/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const command = require(`./commands/${folder}/${file}`);
			client.commands.set(command.name, command);
		}
	}
}

function unregisterAllCommands() {
	const rest = new REST({ version: "9" }).setToken(token);

	rest.get(Routes.applicationGuildCommands(client_id, test_guild_id))
		.then(data => {
			const promises = [];
			for (const command of data) {
				const deleteUrl = `${Routes.applicationGuildCommands(client_id, test_guild_id)}/${command.id}`;
				promises.push(rest.delete(deleteUrl));
			}
			return Promise.all(promises);
		});
}

module.exports = {
	run,
	unregisterAllCommands,
};