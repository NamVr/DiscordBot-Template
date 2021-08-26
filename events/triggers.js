/**
 * @file Main trigger handler file.
 * @author Naman Vrati
 * @since 2.0.0
 */

module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author Naman Vrati
	 * @param {*} message The message which was created.
	 */

	async execute(message) {
		/**
		 * @type {String[]}
		 * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
		 */

		const args = message.content.split(/ +/);

		// Checks if the trigger author is a bot. Comment this line if you want to reply to bots as well.

		if (message.author.bot) return;

		// Checking ALL triggers using every function and breaking out if a trigger was found.

		/** @type {String} */
		let check;

		await message.client.triggers.every(async (trigger) => {
			if (check == 1) return false;
			await trigger.name.every(async (name) => {
				if (check == 1) return false;

				// If validated, it will try to execute the trigger.

				if (message.content.includes(name)) {
					try {
						trigger.execute(message, args);
					} catch (error) {
						// If checks fail, reply back!

						console.error(error);
						message.reply({
							content: "there was an error trying to execute that trigger!",
						});
					}

					check = 1;
					return false;
				}
			});
		});
	},
};
