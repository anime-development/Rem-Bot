const { readdirSync } = require("fs")

module.exports = (client) => {
    const events = readdirSync(`./src/events`).filter(f => f.endsWith('.js'));
    for (let file of events) {
        let event = require(`../events/${file}`);

        client.events.set(event.name, event);

        client.logger.info(`Loaded ${event.name}`);
    }
}