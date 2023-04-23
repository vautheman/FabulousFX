const {Events, InteractionType} = require('discord.js');
const {createAudioPlayer, createAudioResource, joinVoiceChannel} = require("@discordjs/voice");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (! command) {
                console.error(`No command matching ${
                    interaction.commandName
                } was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${
                    interaction.commandName
                }`);
                console.error(error);
            }
        } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (! command) 
                return;
            

            try {
                await command.autocomplete(interaction)
            } catch (error) {
                console.error(error)
            }
        } else if (interaction.isButton()) { // ** Buttons handler
		const btnName = interaction.customId
	
		const channel = interaction.member.voice.channel;
		const player = createAudioPlayer();
		const resource = createAudioResource(`./sounds/${btnName}.mp3`);
		const connection = joinVoiceChannel({channelId: channel.id, guildId: interaction.guild.id, adapterCreator: interaction.guild.voiceAdapterCreator});
	
		player.play(resource);
		connection.subscribe(player);

		await interaction.deferReply({ ephemeral: true });
		await interaction.deleteReply();

            	/*player.addListener("stateChange", (oldOne, newOne) => {
                	if (newOne.status == "idle") {
                    	connection.destroy()
                	}
        	});*/

	}
    }
};
