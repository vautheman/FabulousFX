const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const fs = require('fs')
const path = require('path')


module.exports = {
    data: new SlashCommandBuilder()
      .setName("list")
      .setDescription("Lister tout les effets sonores")
      .addIntegerOption(option =>
        option
          .setName("page")
          .setDescription("Selectionner le numéro de page")
          .setRequired(true)
          .setAutocomplete(true)
      ),

    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        const sounds = Array.from(interaction.client.sounds)
        const paginationLimit = 25;
        const pageCount = Math.ceil(sounds.length / paginationLimit)

        const choices = []

        for(let i = 1; i <= pageCount; i++){
          choices.push(i)
        }

        // const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        await interaction.respond(
            choices.map(choice => ({name: choice, value: choice})),
        );
    },


    async execute(interaction) {

        // Pagination
        // Récupère le numero de page passé en parametre
        const page = interaction.options.getInteger('page');
        // Convertie la collection sounds en tableau
        const sounds = Array.from(interaction.client.sounds)
        // Nombre limit d'élément par page
        const paginationLimit = 25;
        // Calcul le nombre de page en fonction du nombre d'élément total
        const pageCount = Math.ceil(sounds.length / paginationLimit)

        let currentPage;
        let soundSlice = [];
      
        // Fonction qui affiche les éléments en fonction du numéro de page
        const setCurrentPage = (pageNum) => {
          currentPage = pageNum;

          const prevRange = (pageNum - 1) * paginationLimit;
          const currRange = pageNum * paginationLimit;

          sounds.forEach((sound, index) => {
            if(index >= prevRange && index < currRange) {
              soundSlice.push(sound)
            }
          })
        }

        setCurrentPage(page)

        const soundListing = new EmbedBuilder()
        .setTitle(`**Liste des sons présents dans la soundboard**`)
        .setFooter({text: `page : ${page}/${pageCount}`})

        soundSlice.map(file => {
            soundListing.addFields({name: file[0], value: file[1]})
            // console.log(file[0])
        }) 

        await interaction.reply({embeds: [soundListing]})
        
 //        const soundListing = new EmbedBuilder()
 //        .setTitle(`**Liste des sons présents dans la soundboard**`)
 //
 //        const soundsPath = path.join(__dirname, "../../sounds");
 //        const soundsFiles = fs.readdirSync(soundsPath).filter((file) => file.endsWith(".mp3"));
 //
 //        for (const file of soundsFiles) {
 //          // client.sounds.set(path.parse(file).name, file)
 //          soundListing.addFields({name: `${path.parse(file).name}`, value: `${file}`})
 //        }
 // 
 //        await interaction.reply({embeds: [soundListing]})
    }
}
