const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

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

client.npcmds = new Discord.Collection();
const npcmdsFolders = fs.readdirSync("./npcommands");

for (const folder of npcmdsFolders) {
	const npcmdsFiles = fs
		.readdirSync(`./npcommands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of npcmdsFiles) {
		const npcmd = require(`./npcommands/${folder}/${file}`);
		client.npcmds.set(npcmd.name, npcmd);
	}
}

client.login(token);
