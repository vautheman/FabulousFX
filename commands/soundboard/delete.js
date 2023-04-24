const {SlashCommandBuilder} = require("discord.js");
const download = require('download')
const path = require('path')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Supprimer un son")
    .addStringOption( option => 
        option
            .setName("son")
            .setDescription("Son à renomer")
            .setRequired(true)
            .setAutocomplete(true)),
    
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

        let file = await interaction.options.getString("son");        
        await fs.unlink(`./sounds/${file}.mp3`, (err) => {
          if(err) console.log(err);
        });

        /* console.log('Download Completed'); */
        interaction.editReply(`\`${file}\` a bien été supprimé`)
        /* console.log(path.parse(attachmentFile.name).name) */
        interaction.client.sounds.delete(file);
    }
}
