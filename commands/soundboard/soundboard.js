const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js");
const { createAudioResource, joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const fs = require('fs')
const path = require('path')
        
module.exports = {
    data: new SlashCommandBuilder()
    .setName("soundboard")
    .setDescription("Affiche tout les sounds effects")
    .addStringOption(option =>
        option
            .setName("son1")
            .setDescription("Nom du son")
            .setAutocomplete(true)
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName("son2")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son3")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son4")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son5")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son6")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son7")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son8")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son9")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
            .setName("son10")
            .setDescription("Nom du son")
            .setAutocomplete(true)
    ),



    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        /* const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview']; */
        const choices = interaction.client.sounds;
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        await interaction.respond(
            filtered.map(choice => ({name: path.parse(choice).name, value: path.parse(choice).name})),
        );
    },

    
    async execute(interaction) {
        const soundBoard = new ActionRowBuilder();
        const son1 = await interaction.options.getString('son1');
        const son2 = await interaction.options.getString('son2');
        const son3 = await interaction.options.getString('son3');
        const son4 = await interaction.options.getString('son4');
        const son5 = await interaction.options.getString('son5');
        const son6 = await interaction.options.getString('son6');
        const son7 = await interaction.options.getString('son7');
        const son8 = await interaction.options.getString('son8');
        const son9 = await interaction.options.getString('son9');
        const son10 = await interaction.options.getString('son10');

        if(son1){
            const sound1 = new ButtonBuilder()
            .setCustomId(son1)
            .setLabel(son1)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound1);
        }

        if(son2){
            const sound2 = new ButtonBuilder()
            .setCustomId(son2)
            .setLabel(son2)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound2);
        }

        if(son3){
            const sound3 = new ButtonBuilder()
            .setCustomId(son3)
            .setLabel(son3)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound3);
        }

        if(son4){
            const sound4 = new ButtonBuilder()
            .setCustomId(son4)
            .setLabel(son4)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound4);
        }

        if(son5){
            const sound5 = new ButtonBuilder()
            .setCustomId(son5)
            .setLabel(son5)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound5);
        }

        if(son6){
            const sound6 = new ButtonBuilder()
            .setCustomId(son6)
            .setLabel(son6)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound6);
        }

        if(son7){
            const sound7 = new ButtonBuilder()
            .setCustomId(son7)
            .setLabel(son7)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound7);
        }

        if(son8){
            const sound8 = new ButtonBuilder()
            .setCustomId(son8)
            .setLabel(son8)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound8);
        }

        if(son9){
            const sound9 = new ButtonBuilder()
            .setCustomId(son9)
            .setLabel(son9)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound9);
        }

        if(son10){
            const sound10 = new ButtonBuilder()
            .setCustomId(son10)
            .setLabel(son10)
            .setStyle(ButtonStyle.Primary);

            soundBoard.addComponents(sound10);
        }

        interaction.reply({
            components: [soundBoard]
        })
    }
}