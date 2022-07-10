module.exports = {
    name: 'ready',
    async run(client) {
        client.apiclient.version_check();
        client.logger.info(`Ready on ${process.env.VERSION}`)


    }
}


