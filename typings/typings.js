/**
 * @file Common Typings File
 * @author NamVr
 * @since 3.1.0
 */

/**
 * @typedef {Object} Command
 */

/**
 * @typedef {Function} CommandExecute
 * @description Executes when the command is called by command handler.
 * @author NamVr
 * @param {import('discord.js').Message} message The Message Object of the command.
 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
*/