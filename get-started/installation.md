---
description: >-
  Clone bot template, install dependencies, fill config file, invite link
  (scopes) and more to get started
---

# Installation

Now, when we have done the [Basic Setup](basic-setup.md), we are ready to make our discord bot with the awesome template. Let's dig into it.

## Clone The Template

To get started, you need to get a skeleton code structure for your discord bot to work upon. Since this guide is based on my [Discord.js Bot Template](https://github.com/NamVr/DiscordBot-Template/) I made with :heart: for you, you need to go to the page in order to clone it, or simply follow these instructions.

1. Make a new folder that will contain all your discord bot projects. Let's say, we name it `Discord Projects`.
2. Get inside the folder and open terminal/command prompt. Learn more here on how to.
3. Now you need to copy paste this code inside the terminal to clone the repository:

```bash
git clone https://github.com/NamVr/DiscordBot-Template.git
```

Now you have **successfully** cloned the template. At this instance, you may want to check your `Discord Projects` folder and see a new folder named `DiscordBot-Template`. Go ahead, and **rename the folder** to the project name of your upcoming bot.

{% hint style="info" %}
I have assumed that you have renamed the folder to `Mandy`. Don't mind me, it is just a random generated project name using [this tool](https://mrsharpoblunto.github.io/foswig.js/).
{% endhint %}

## Installing Dependencies

Now, in our `Discord Projects` folder, we have a folder named `Mandy`. It's time to open our code editor, Visual Studio Code.

1. Open Visual Studio Code.
2. Open the `Mandy` folder.
3. Wait for VSC to initialize the project and open it.
4. Now you need to open the Integrated Terminal in VSC, you can find it in `Terminal` menu tab.

There you go. Project Coding Environment is setup and you are good to code and of course run some sneaky terminal commands.

### **To install dependencies, run this command:**

```
npm i
```

And yeah... That's it! You will now notice a big `node_modules` folder appearing in your project directory. You will also notice it is faded, because it is ignored by git to be pushed into remote server! You can [learn more about `.gitignore` over here](https://git-scm.com/docs/gitignore).

## Application Configuration

It's time to fill the configuration of your project. Before doing this, I'll assume you already have a bot application registered at the [Discord Developer Portal](https://discord.com/developers) so we will not waste time in learning that.

Notice a `config.json` file in your project directory. Do you see it? Let's open it and fill details of our project for the template to know - _what to do_.

{% code title="config.json" %}
```json
{
	"prefix": "!",
	"token": "your-bot-token",
	"owner": "owner-id",
	"client_id": "bot-id",
	"test_guild_id": "dev-server-id"
}
```
{% endcode %}

That is a default config, and you guessed it _(maybe)_! This won't work and of course we need to edit the config properties one by one.

### prefix

This is where you setup prefixes for legacy (message-based) commands. Feel free to put and replace your own prefix, _but we do recommend to keep your prefix in less than 10 characters._

### token

You need to replace `your-bot-token` with your actual bot token that you can get from your Application => Bot Developer Portal Settings. Paste it there. Make sure the token is covered with double quotes `"&#&ABCXYZ"` (like that maybe).

### owner

This property is used to define the bot owner. Feeling proud? Fill up your discord user ID in that place!

### client\_id

This is where you will paste your bot's application/user ID. Simply get it from Developer Portal or Right Click your bot in your server => Copy ID.

### test\_guild\_id

We of course recommend you making a development server for only you - and your bot to hang out and do crazy experiments and meanwhile learning as well. Put a server ID, and we will use that to register slash commands in there.

#### And, that's all? Yeah.

## Invite & Scopes

It's time to invite your bot with proper scopes. You will at least need two mandatory scopes to prevent chaos. `bot` and `applications.commands`.

I'll actually not waste time here to explain it, because the official community has done it very nicely.

{% embed url="https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links" %}
_<mark style="color:orange;">Yeah, that guide is pog as well. But this one is a bit-too detailed.</mark>_
{% endembed %}

#### Oh my god, how do I bring my bot online!?!?

## Run Your Application

If you have done all correctly, it's time to bring your bot online and running. Let's do it.

* Open the VSC Integrated Terminal and type this command:

```bash
npm i
```

_"I see some logs right there"_

{% embed url="https://tenor.com/view/baby-curious-thinking-meme-hmmm-gif-20552190" %}
_<mark style="color:blue;">**Hmmm, probably you got success. The bot is online.**</mark>_
{% endembed %}
