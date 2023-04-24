const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const fs = require('fs')
const path = require('path')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lister toute les commandes du bot"),

    async execute(interaction) {

        const commandsHelper = new EmbedBuilder()
        .setTitle(`**Liste des commandes du bot**`)

        interaction.client.commands.map(file => {
            commandsHelper.addFields({name: `\`/${file.data.name}\``, value: file.data.description})
        }) 

        await interaction.reply({embeds: [commandsHelper]})
    }
}
