const { Client, CommandInteraction, Permissions } = require("discord.js");


module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async run(client, interaction) {


        const { commandName } = interaction;

        if (!interaction.isCommand()) return;

        let command = client.commands.get(commandName);

        let commands = client.application.commands;

        let devguild;

        if (process.env.BETA === 'true') devguild = client.guilds.cache.get(process.env.DEVGUILDID);

        if (process.env.BETA === 'true') commands = devguild.commands;

        if (!command || command.slash === 'false') {
            interaction.reply(`This command is ether removed or is msg only so i removed it`);

            commands.delete(interaction.commandId).then(cmd => client.logger.error(`removed ${commandName} from slash`))
        }

        let apiclient = client.apiclient

        const permcheck = new Permissions(command.perm);

        if (!interaction.member.permissions.has(permcheck)) return interaction.reply({ content: `Missing ${permcheck.toArray().join(", ")}`, ephemeral: true });

        let extras = {};
        if (command.slash === "both") command.both(client, null, null, interaction, extras, "int", apiclient);
        else command.command(client, interaction, extras, apiclient);


    }
}