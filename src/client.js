require('dotenv').config();
const { Client, Intents, Collector, Collection } = require("discord.js");
const { APiClient, Logs } = require("ram-api.js");

class RemClient extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_WEBHOOKS,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
            ],
            allowedMentions: {
                parse: ["users", "roles", "everyone"],
                repliedUser: true,
            },
            partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
        })

        this.apiclient = new APiClient(process.env.APIKEY, process.env.APIVERSION);
        this.logger = new Logs("Rem Bot")
        this.commands = new Collection();
        this.events = new Collection();


    }
    start() {
        this.on('ready', async () => {
            await ["event", "command"].forEach(hand => {
                require(`./Handalers/${hand}`)(this)
            })
            this.events.get('ready').run(this);
        })

        this.events.forEach(event => {
            event.start(this);
        })



        this.login(process.env.TOKEN)
    }
}

module.exports = RemClient;