const config = require('../config.js')

module.exports = client => {
    console.log(`Logged on: ${client.user.tag}`)

    config.setClientInfo(client)

    let botModules = config.getBotModules()

    //For some reason labels don't work so instead I use an auxiliar variable to skip to the first loop. [Try to fix later]
    for (i in botModules) {
        let auxiliar = 0
        let ticketChannel = client.channels.cache.get(botModules[i]['creation-channelID'])
        ticketChannel.messages.fetchPinned().then(messages => {
            let messageArray = messages.array()
            for (j in messageArray) {
                if (messageArray[j].author.id === client.user.id) {
                    console.log(`Found the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
                    auxiliar = 1
                }
            }
            if (auxiliar === 0) {
                console.log(`Sending the ticket creation message for channel: ${ticketChannel.name} (${ticketChannel.id})`)
                ticketChannel.send(config.getCreationEmbed(botModules[i])).then(message => {
                    message.react('📩')
                    message.pin()
                })
            }
        })

        let ticketCategory = client.channels.cache.get(botModules[i]['tickets-categoryID'])
            ticketCategory.children.forEach(channel => {
                channel.messages.fetchPinned()
                channel.permissionOverwrites.find(overWrite => {
                    if (overWrite.type === 'member') {
                        if (!config.usersArray.includes(overWrite.id)) {
                            console.log(`Found a ticket from the user with ID: ${overWrite.id}`)
                            config.usersArray.push(overWrite.id)
                        }
                    }
                })
            })
    }
}

