module.exports = {
	data: {
		name: "sample",
		type: 2, // 2 is for user context menus
	},
	execute: async (interaction) => {
		await interaction.reply({
			content: "I am a sample user context menu.",
		});
	},
};
