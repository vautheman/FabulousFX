const {SlashCommandBuilder} = require("discord.js");
const download = require('download')
const path = require('path')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rename")
    .setDescription("Renomer un son")
    .addStringOption( option => 
        option
            .setName("son")
            .setDescription("Son à renomer")
            .setRequired(true)
            .setAutocomplete(true))
    .addStringOption( option =>
      option
        .setName("rename")
        .setDescription("Nouveau nom")
        .setRequired(true)),

    
    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        const choices = interaction.client.sounds;
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        await interaction.respond(
            filtered.map(choice => ({name: path.parse(choice).name, value: path.parse(choice).name})),
        );
    },

    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});

        let oldFile = await interaction.options.getString("son");
        let newName = await interaction.options.getString("rename");
        
        fs.renameSync(`./sounds/${oldFile}.mp3`, `./sounds/${newName}.mp3`);

        /* console.log('Download Completed'); */
        interaction.editReply(`\`${oldFile}\` à été renomé par ${newName} avec succès`)
        /* console.log(path.parse(attachmentFile.name).name) */
        interaction.client.sounds.delete(`${oldFile}`);
        interaction.client.sounds.set(newName, `${newName}.mp3`); 
    }
}
