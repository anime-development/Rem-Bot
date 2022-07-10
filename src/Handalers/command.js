const { Client } = require("discord.js");
const { readdir, readdirSync } = require("fs")

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    const commandName = readdirSync("./src/Commands").filter(f => f.endsWith('.js'));

    let commands = client.application.commands;

    if (process.env.BETA === "true") {
        client.logger.warn('Bot is beta active slash loaded to dev guild');
        commands = client.guilds.cache.get(process.env.DEVGUILDID).commands;
        for (let file of commandName) {
            let command = require(`../Commands/${file}`);

            client.commands.set(command.name, command);

            let { name, description, options } = command;

            if (!options) options = [];

            if (command.slash === "true") {
                commands?.create({
                    name,
                    description,
                    options
                })

                client.logger.info(`Loaded command ${name} as a slash only command`);


            }
            if (command.slash === "both") {
                commands?.create(name, description, options);

                client.logger.info(`Loaded command ${name} as slash and message command!`)
            }
            if (command.slash === "false") {
                client.logger.info(`Loaded command ${name} as message only command`)
            }
        }
    }
}