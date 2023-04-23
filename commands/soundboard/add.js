const {SlashCommandBuilder} = require("discord.js");
const download = require('download')
const path = require('path')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Ajouter un son")
    .addAttachmentOption( option => 
        option
            .setName("fichier")
            .setDescription("Lien du fichier")
            .setRequired(true)),
    
    async execute(interaction, client) {
        let attachmentFile = await interaction.options.getAttachment("fichier") || 'none';
        console.log(attachmentFile.url)
        
        await download(attachmentFile.url, './sounds/')
        .then(() => {
            /* console.log('Download Completed'); */
            interaction.reply(`${path.parse(attachmentFile.name).name} à bien été ajouté à la soundboard`)
            interaction.client.sounds.set(path.parse(attachmentFile.name).name, attachmentFile.name)
            /* console.log(path.parse(attachmentFile.name).name) */
        })
    }
}
