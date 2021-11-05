/**
 * @file Common Typings File
 * @author NamVr
 * @since 3.1.0
*/

/**
 * @callback execute define
 * @param {import('discord.js').Message} message The Comand Message Object,
 * @param {String[]} [args] Command String Arguments.
 */

/**
 * Legacy Command Object Model.
 * @typedef {Object} LegacyCommand A Legacy (Text-Based) Command Module
 * @property {String} name Command Name (100 letters)
 * @property {!String} [description] Command Description
 * @property {String} [usage] Command Usage (without command name or prefix)
 * @property {Boolean} [ownerOnly] Whether this command can be run only by bot owners or not.
 * @property {Boolean} [args] Whether this command should have expected arguments or not.
 * @property {execute} execute Main code that executes the command.
 * @property {import('discord.js').PermissionString[]} [permissions] Permissions of this command.
 * @return {void}
 */