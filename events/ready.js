const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		/* console.log(client.sounds) */
		client.user.setUsername("FabulousFX");
		client.user.setActivity("SoundBoard");
	},
};
