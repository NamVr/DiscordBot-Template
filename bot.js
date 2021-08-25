const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { prefix, token, client_id, test_guild_id } = require("./config.json");

// From v13, specifying the intents is compulsory.
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS
	]
});

// Event registration
const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, async (...args) => await event.execute(...args, client));
	}
}

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

// Old command registration
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Slash command local registration
const slashCommands = fs.readdirSync("./slashCommands");
for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./slashCommands/${module}`)
		.filter((file) => file.endsWith(".js"));
		
	for (const commandFile of commandFiles) {
		const command = require(`./slashCommands/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

// Slash command api registration
const rest = new REST({ version: '9' }).setToken(token);

const commandJsonData = Array.from(client.slashCommands.values()).map(c => c.data.toJSON());

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			/* IMP: Here we are sending to discord our slash commands to be registered. 
			There are 2 types of commands, guild commands and global commands. 
			Guild commands are for specific guilds and global ones are for all. 
			In development, you should use guild commands as guild commands update
			instantly, whereas global commands take upto 1 hour to be published. To 
			deploy commands globally, replace the line below with: 
						Routes.applicationCommands(client_id)						*/
			Routes.applicationGuildCommands(client_id, test_guild_id),
			{ body: commandJsonData },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


client.triggers = new Collection();
const triggerFolders = fs.readdirSync("./triggers");

for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}

client.login(token);
