/**
 * @file Sample ping command
 * @author NamVr
 * @since 1.0.0
 */

import '../../typings/typings'; 

/**
 * @type {LegacyCommand} Command
 */
const Command = {
	name: "ping",
	description: "",
	execute (message, args) {
		message.channel.send({ content: "Pong." });
	},
};

module.exports = Command;
