const {Client, GatewayIntentBits, Collection, Events, EmbedBuilder} = require("discord.js");
const {DisTube} = require('distube')
const fs = require("fs");
const path = require("path");
require('dotenv').config();

require("./deploy-commands")

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages]
});

const { YtDlpPlugin } = require('@distube/yt-dlp');
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new YtDlpPlugin()
    ]
  })

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

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filtre: \`${queue.filters.names.join(', ') || 'Off'}\` | Boucle: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube
  .on('playSong', (queue, song) => {
    const embed = new EmbedBuilder()
        .setColor(0x118ab2)
        .setTitle(`▶️ | Lecture de \`${song.name}\` - \`${song.formattedDuration}\``)
        .setDescription(`Envoyé par: ${song.user}\n${status(queue)}`)

    queue.textChannel.send({ embeds: [embed] })
  })
  .on('addSong', (queue, song) => {

    const embed = new EmbedBuilder()
        .setColor(0x06d6a0)
        .setTitle(`✅ | Ajout de ${song.name} - \`${song.formattedDuration}\` à la file d'attente`)
        .setDescription(`Envoyé par : ${song.user}`)

    queue.textChannel.send({ embeds: [embed] })
  })
  .on('addList', (queue, playlist) => {
    const embed = new EmbedBuilder()
        .setColor(0x06d6a0)
        .setTitle(`✅ | Ajout de la playlist \`${playlist.name}\` - \`(${playlist.songs.length} songs)\` à la file d'attente`)
        .setDescription(`Envoyé par : ${song.user}`)

    queue.textChannel.send({ embeds: [embed] })
  })
  .on('error', (channel, e) => {
    if (channel) channel.send(`❌ | Une erreur a été rencontrée : ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('Le salon vocal est vide ! Je me taille...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`❌ | Auncun résultat trouvé pour \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send("👍 La liste d'attente est terminé"))
// Connexion du bot
client.login(process.env.TOKEN)
