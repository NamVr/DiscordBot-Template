import * as Discord from "discord.js";

/**
 * Represents a chat-based Message Command.
 */
export interface LegacyCommand {
	/**
	 * The name of the command.
	 */
	name: string;

	/**
	 * Aliases or similar names for the command.
	 */
	aliases?: string[];

	/**
	 * The description of the command.
	 */
	description?: string;

	/**
	 * The usage of the command.
	 */
	usage?: string;

	/**
	 * The permissions required by a discord user to run this command.
	 */
	permissions?: Discord.PermissionResolvable;

	/**
	 * Whether this command is only a guild-based command.
	 */
	guildOnly?: boolean;

	/**
	 * Whether this command requires arguments.
	 */
	args?: boolean;

	/**
	 * The cooldown in seconds of this command.
	 */
	cooldown?: number;

	/**
	 * Whether this command is only a bot owner-based command.
	 */
	ownerOnly?: boolean;

	/**
	 * The command executor when it is called by the template handler.
	 * @param message The message that triggered this command.
	 * @param args The message arguments of the command (seperated by spaces (' ') in an array, this excludes prefix and command/alias itself).
	 */
	execute(
		message: Discord.Message & { client: Client },
		args: string[]
	): void | Promise<void>;
}

/**
 * Represents an Application Command (Slash Command).
 */
export interface SlashInteractionCommand {
	/**
	 * The data of Application Command Interaction (Slash Command).
	 */
	data: Discord.SlashCommandBuilder;
	options: Array<
		| Discord.SlashCommandStringOption
		| Discord.SlashCommandNumberOption
		| Discord.SlashCommandRoleOption
		| Discord.SlashCommandUserOption
		| Discord.SlashCommandBooleanOption
		| Discord.SlashCommandChannelOption
		| Discord.SlashCommandIntegerOption
	>;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: Discord.ChatInputCommandInteraction & { client: Client }
	): void | Promise<void>;
}

/**
 * Represents a Button Interaction.
 */
export interface ButtonInteractionCommand {
	/**
	 * The custom ID of the button which was interacted with.
	 */
	id: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: Discord.ButtonInteraction & { client: Client }
	): void | Promise<void>;
}

/**
 * Represents a Select Interaction.
 */
export interface SelectInteractionCommand {
	/**
	 * The custom ID of the select (menu option) which was interacted with.
	 */
	id: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: Discord.SelectMenuInteraction & { client: Client }
	): void | Promise<void>;
}

/**
 * The data of Context Menu Interaction Command.
 */
export interface ContextInteractionCommandData {
	/**
	 * The name of the context (menu option) which was interacted with.
	 */
	name: string;

	/**
	 * The type of the context (menu option) which was interacted with.
	 * 2: User Based Context Menu Option.
	 * 3: Message Based Context Menu Option.
	 */
	type: 2 | 3;
}

/**
 * Represents a Context Interaction.
 */
export interface ContextInteractionCommand {
	/**
	 * The data of Context Menu Interaction Command.
	 */
	data: ContextInteractionCommandData;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: Discord.ContextMenuCommandInteraction & { client: Client }
	): void | Promise<void>;
}

/**
 * Represents a ModalSubmit Interaction.
 */
export interface ModalInteractionCommand {
	/**
	 * The custom ID of the modal (submit) which was interacted with.
	 */
	id: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: Discord.ModalSubmitInteraction & { client: Client }
	): void | Promise<void>;
}

/**
 * Represents a chat-based Trigger Command.
 */
export interface TriggerCommand {
	/**
	 * The names / aliases of the trigger command.
	 */
	name: string[];
	/**
	 * The command executor when it is called by the template handler.
	 * @param message The message that triggered this command.
	 * @param args The message arguments of the command (seperated by spaces (' ') in an array).
	 */
	execute(
		message: Discord.Message & { client: Client },
		args: string[]
	): void | Promise<void>;
}

/**
 * Represents a Autocomplete Interaction.
 */
export interface AutocompleteInteraction {
	/**
	 * The command name of the autocomplete interaction which was interacted with.
	 */
	name: string;

	/**
	 * The interaction executor when it is called by the template handler.
	 * @param interaction The interaction that triggered this command.
	 */
	execute(
		interaction: Discord.AutocompleteInteraction & { client: Client }
	): void | Promise<void>;
}

/**
 * Modified in-built Client that includes support for command/event handlers.
 */
export interface Client extends Discord.Client {
	/**
	 * Represents a collection of chat-based Message Commands.
	 */
	commands: Discord.Collection<string, LegacyCommand>;

	/**
	 * Represents a collection of Application Commands (Slash Commands).
	 */
	slashCommands: Discord.Collection<string, SlashInteractionCommand>;

	/**
	 * Represents a collection of Button Interactions.
	 */
	buttonCommands: Discord.Collection<string, ButtonInteractionCommand>;

	/**
	 * Represents a collection of Select Interactions.
	 */
	selectCommands: Discord.Collection<string, SelectInteractionCommand>;

	/**
	 * Represents a collection of Context Interactions.
	 */
	contextCommands: Discord.Collection<string, ContextInteractionCommand>;

	/**
	 * Represents a collection of ModalSubmit Interactions.
	 */
	modalCommands: Discord.Collection<string, ModalInteractionCommand>;

	/**
	 * Represents cooldown collection for Legacy Commands.
	 */
	cooldowns: Discord.Collection<string, Discord.Collection<string, number>>;

	/**
	 * Represents a collection of chat-based Trigger Commands.
	 */
	triggers: Discord.Collection<string, TriggerCommand>;

	/**
	 * Represents a collection of autocomplete interactions.
	 */
	autocompleteInteractions: Discord.Collection<string, AutocompleteInteraction>;
}
