const config = require('../config.js')

module.exports = client => {
    console.log(`Logged on: ${client.user.tag}`)

    config.setClientInfo(client)

    let ticketChannel
    let embedMessage

    let botModules = config.getBotModules()

    for (i in botModules) {
        ticketChannel = client.channels.cache.get(botModules[i]['creation-channelID'])
        ticketChannel.bulkDelete(5)

        console.log(`Sending the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
        embedMessage = config.getCreationEmbed(botModules[i])

        ticketChannel.send(embedMessage).then(message => {
            message.react('📩')
        })
    }
}
