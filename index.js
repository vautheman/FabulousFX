const {Client, GatewayIntentBits, Collection, Events, EmbedBuilder} = require("discord.js");
const fs = require("fs");
const path = require("path");
require('dotenv').config();
require("./deploy-commands")

const client = new Client({
    intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildVoiceStates, 
	GatewayIntentBits.GuildMessageReactions, 
	GatewayIntentBits.GuildMessages
    ]
});


/*  COMMANDS COLLECTION  */

client.commands = new Collection()

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

/* SOUNDS COLLECTION */

client.sounds = new Collection()

const soundsPath = path.join(__dirname, "sounds");
const soundsFiles = fs.readdirSync(soundsPath).filter((file) => file.endsWith(".mp3"));

for (const file of soundsFiles) {
    client.sounds.set(path.parse(file).name, file)
}

/*  EVENTS  */

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Connexion du bot
client.login(process.env.TOKEN)
