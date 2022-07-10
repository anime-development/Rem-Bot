const { Client, Interaction, CommandInteraction } = require("discord.js");
const { APiClient } = require("ram-api.js");

module.exports = {
    name: 'hello',
    description: 'Get a hello',
    slash: 'true',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {*} extras 
     * @param {APiClient} apiclient 
     */
    async command(client, interaction, extras, apiclient) {
        let resualts = await apiclient.hello("english");

        interaction.reply(resualts.text)
    }
}