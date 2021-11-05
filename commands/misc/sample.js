/**
 * @file Sample ping command
 * @author NamVr
 * @since 1.0.0
 */

 import '../../typings/typings';

 /**
  * I want to document THIS.
  * @module LegacyCommand
  * @type {LegacyCommand} Command - THIS DOES NOT WORK :(
  * @this LegacyCommand
  */
module.exports = {
    name: 5,
 
     /** You need to uncomment below properties if you need them. */
     //description: 'Ping!',
     //usage: 'put usage here',
     //permissions: 'SEND_MESSAGES',
     //guildOnly: true,
 
     /**
      * @description Executes when the command is called by command handler.
      * @author NamVr
      * @param {import('discord.js').Message} message The Message Object of the command.
      * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
      */

     execute(message, args) {
         message.channel.send({ content: "Pong." });
     },
 }; 