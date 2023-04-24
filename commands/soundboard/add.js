const {SlashCommandBuilder} = require("discord.js");
const download = require('download')
const path = require('path')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Ajouter un son")
    .addAttachmentOption( option => 
        option
            .setName("fichier")
            .setDescription("Lien du fichier")
            .setRequired(true))
    .addStringOption( option =>
      option
        .setName("nom")
        .setDescription("Nom de l'effet")
        .setRequired(true)),
    
    async execute(interaction, client) {
        let attachmentFile = await interaction.options.getAttachment("fichier") || 'none';
        let nameFile = await interaction.options.getString("nom");
        console.log(attachmentFile.url)
        
        await download(attachmentFile.url, `./sounds/`)
        .then(() => {
            fs.renameSync(`./sounds/${attachmentFile.name}`, `./sounds/${nameFile}.mp3`);

            /* console.log('Download Completed'); */
            interaction.reply(`\`${nameFile}\` à bien été ajouté à la soundboard`)
            interaction.client.sounds.set(path.parse(attachmentFile.name).name, attachmentFile.name)
            /* console.log(path.parse(attachmentFile.name).name) */

            
        })
    }
}
