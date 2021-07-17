const config = require('../config.js')

module.exports = client => {
    console.log(`Logged on: ${client.user.tag}`)

    config.setClientInfo(client)

    var botModules = config.getBotModules()

    for (i in botModules) {

    let ticketChannel = client.channels.cache.get(botModules[i]['creation-channelID'])
        ticketChannel.bulkDelete(5)

        console.log(`Sending the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
        var embedMessage = config.getEmbedMessage(botModules[i])
        ticketChannel.send(embedMessage).then(sentEmbed => {
            sentEmbed.react("📩")
        })
    }
}