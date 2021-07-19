const config = require('../config.js')

module.exports = client => {
    console.log(`Logged on: ${client.user.tag}`)

    config.setClientInfo(client)

    let botModules = config.getBotModules()
    let ticketChannel
    let embedMessage
    
    for (i in botModules) {
        ticketChannel = client.channels.cache.get(botModules[i]['creation-channelID'])
        ticketChannel.bulkDelete(5)

        console.log(`Sending the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
        embedMessage = config.getEmbedMessage(botModules[i])
        
        ticketChannel.send(embedMessage).then(sentEmbed => {
            sentEmbed.react("📩")
        })
    }
}
