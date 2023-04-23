const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const fs = require('fs')
const path = require('path')


module.exports = {
    data: new SlashCommandBuilder().setName("list").setDescription("Lister tout les effets sonores"),

    async execute(interaction) {

        const soundListing = new EmbedBuilder()
        .setTitle(`**Liste des sons présents dans la soundboard**`)

        interaction.client.sounds.map(file => {
            soundListing.addFields({name: `${path.parse(file).name}`, value: `${file}`})
        }) 

        await interaction.reply({embeds: [soundListing]})
    }
}
