/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
