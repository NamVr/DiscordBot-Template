module.exports = {
	name: "interactionCreate",
	execute: async (interaction) => {
		if (!interaction.isContextMenu) return;

		const { client } = interaction;

		if (interaction.targetType === "USER") {
			// Its a user context menu.
			const { execute } = client.contextCommands.get(
				"USER " + interaction.commandName
			);
			await execute(interaction);
		} else if (interaction.targetType === "MESSAGE") {
			// Its a message context menu
			const { execute } = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);
			await execute(interaction);
		} else {
			console.log(
				"Something weird happening in context menu. Received a context menu of unknown type."
			);
		}
	},
};
