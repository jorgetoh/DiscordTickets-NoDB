const config = require('../config.js')

module.exports = async (client) => {
    console.log(`Logged on: ${client.user.tag}`)

    config.setClientInfo(client)

    botModules = config.getBotModules()

    firstLoop:
    for (i in botModules) {
        ticketCategory = await client.channels.cache.get(botModules[i]['tickets-categoryID'])
        await ticketCategory.children.forEach(channel => {
            if (channel.name.startsWith(botModules[i]['prefix'])) {
                channel.messages.fetchPinned()
                channel.permissionOverwrites.find(overWrite => {
                    if (overWrite.type === 'member') {
                        if (!config.usersArray.includes(overWrite.id)) {
                            console.log(`Found a ticket from the user with ID: ${overWrite.id}`)
                            config.usersArray.push(overWrite.id)
                        }
                    }
                })
            }
        })

        ticketChannel = await client.channels.cache.get(botModules[i]['creation-channelID'])
        const messages = await ticketChannel.messages.fetchPinned()
        let messageArray = messages.array()
        for (j in messageArray) {
            if (messageArray[j].author.id === client.user.id) {
                console.log(`Found the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
                continue firstLoop
            }
        }
        console.log(`Sending the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
        ticketChannel.send(config.getCreationEmbed(botModules[i])).then(message => {
            message.react('📩')
            message.pin()
        })
    }
}
