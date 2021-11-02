---
description: Welcome to NamVr Discord Bot Template 👋
---

# Welcome!

![Version](https://img.shields.io/badge/version-v2.0-blue.svg?cacheSeconds=2592000) [![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/NamVr/DiscordBot-Template#readme) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NamVr/DiscordBot-Template/graphs/commit-activity) [![Twitter: namanvrati](https://img.shields.io/twitter/follow/namanvrati.svg?style=social)](https://twitter.com/namanvrati)

> An **open source** `discord.js` bot template which is based on official [discord.js guide](https://discordjs.guide) to get started on making your very personal discord bot!

### 🏠 [Homepage](https://github.com/NamVr/DiscordBot-Template#readme)

## Introduction

`NamVr` Discord Bot Template is an open source discord.js based bot template to get started on a new bot project. It is a classic javascript template, not requiring any external dependencies unlike other famous frameworks. (This is not a framework!) You can scale any kind of bot project using this template. (single server based or multiple server based) It all depends on your creativity!

### Features:

This template comes with many in-built, useful and flexible features, such as:

#### • **Dynamic Command Handler:**

* My template comes with a dynamic command handler! Using the command handler, you don't need to edit the main bot files to create your very own command!&#x20;
* You can simply make command groups (categorized as folders) in the [commands](https://github.com/NamVr/DiscordBot-Template/tree/master/commands/) folder.
* Your JavaScript commands goes inside respective category folders. A sample command is provided as a command called [ping](https://github.com/NamVr/DiscordBot-Template/blob/master/commands/misc/ping.js). You can use the same skeleton for all commands you want!

#### • **Dynamic Event Handler:**

* All events go inside the [events](https://github.com/NamVr/DiscordBot-Template/blob/master/events/) folder. You don't need to use `client.on()` in the main `bot.js` file to handle events.&#x20;
* Using the simple skeleton code for events, you can make unlimited amount of events in the events folder using the event handler.&#x20;

#### • **\[NEW] Dynamic Trigger Handler:**

* The all new addition to my discord bot template. Triggers occur when a specific "phrase" is said in a message's content. For example, if you want your bot to react with :heart: when someone says `welcome` in their message, you can do that with this trigger handler!
* Trigger Handler also has the same skeleton structure as the command handler. The trigger handler is associated with the [triggers](https://github.com/NamVr/DiscordBot-Template/tree/master/triggers/) folder. There are trigger categories like the [reactions](https://github.com/NamVr/DiscordBot-Template/tree/master/triggers/reactions) folder in the trigger folder.
* A sample trigger command is given in the [`hello.js`](https://github.com/NamVr/DiscordBot-Template/tree/master/triggers/reactions/hello.js) trigger file.

#### • **Highly Customizable:**

Using the template is really easy and fun, you will find that out when you use it. As the template does not rely on any external dependencies and is written in javascript, it is customizable to any extent. There is no end to your creativity!

#### • **Open source and self-hosted:**

> It's yours, you have full control.

## Install

```bash
npm install
```

## Run tests

```bash
npm run test
```

## Support & Documentation

I'm working on making it more professional and easy to use for everyone. You're in the right place for documentation!

## 🤝 Contributing

Contributions, issues and feature requests are welcome!\
Feel free to check the [issues page](https://github.com/NamVr/DiscordBot-Template/issues). You can also take a look at the [contributing guide](https://github.com/NamVr/DiscordBot-Template/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you! Star-ing the project gives me encouragement to continue working on it. You can also [sponsor](https://ko-fi.com/namanvrati) the project and get listed as a contributor! Thanks a lot.

## 📝 License

Copyright © 2021 [Naman Vrati](https://github.com/NamVr).\
This project is [ISC](https://github.com/NamVr/DiscordBot-Template/blob/master/LICENSE) licensed.
