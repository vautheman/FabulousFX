const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, AutocompleteInteraction} = require("discord.js");
const { createAudioResource, joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const path = require("path")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sound")
    .setDescription("Jouer un effet")
    .addStringOption(option => 
        option
            .setName("son")
            .setDescription("Nom du son")
            .setAutocomplete(true)
            .setRequired(true)
        ),


    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        /* const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview']; */
        const choices = Array.from(interaction.client.sounds)

        const filtered = choices.filter(choice => choice[0].includes(focusedValue));
        
        // Découpe le tableau par 25 elements max
        let options;
        if(filtered.length > 25) { 
          options = filtered.slice(0, 25)
        } else options = filtered

        await interaction.respond(
            options.map(choice => ({name: choice[0], value: choice[1]})),
        );

        // console.log(choices)
    },

    async execute(interaction) {

        let nameSong = await interaction.options.getString("son");

        const channel = interaction.member.voice.channel;
        
        const player = createAudioPlayer();
        const resource = createAudioResource(`./sounds/${nameSong}.mp3`);

        const connection = joinVoiceChannel({channelId: channel.id, guildId: interaction.guild.id, adapterCreator: interaction.guild.voiceAdapterCreator});
        
        player.play(resource);
        connection.subscribe(player);

        const btnSong = new ButtonBuilder()
            .setCustomId(nameSong)
            .setLabel(nameSong)
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(btnSong);

        interaction.reply({
            components: [row]
        })
    }
};

