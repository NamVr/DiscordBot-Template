const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Ready Event
client.once('ready', () => {
	console.log('Ready!');
});

// On Message (Any Message)
client.on('message', message => {
    // A good practice is to avoid reading commands from other bots! Also return if the command does not starts with the prefix in config.json!

    if (!message.content.startsWith(prefix) || message.author.bot) return;
	
    // Splits the arguments by reading spaces, BONUS: Ignores the extra spaces!
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    // Converts your command to lower case, then !PING == !ping == !pInG
	const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
    
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
    
        return message.channel.send(reply);
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
        }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
        }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (!client.commands.has(command)) return; 

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command! (We will be changing this message later!)');
	}
});

// Bot Logins Here
client.login(token);