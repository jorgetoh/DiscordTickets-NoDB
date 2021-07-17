const Discord = require('discord.js')
const config = require('./config.json')

var ticketAmount = 0

function createNewTicket(module, guild) {
    ticketAmount += 1
    guild.channels.create(`${module['prefix']}-${ticketAmount}`, {
        type: 'text',
        parent: module['tickets-categoryID'],
        permissionOverwrites: []
    })

}

function setClientInfo(client) {
    client.user.setPresence({
        activity: {
            name: config.bot.info.clientInfo.activityName,
            type: config.bot.info.clientInfo.activityType
        },
        status: config.bot.info.clientInfo.clientStatus
    })

    client.user.setUsername(config.bot.info.clientInfo.name)
}

function getEmbedMessage(module) {
    var embedMessage = new Discord.MessageEmbed()

    embedMessage.setTitle(module['embedMsg']['embedTitle'])
    embedMessage.setDescription(module['embedMsg']['embedDesc'])
    embedMessage.setThumbnail(module['embedMsg']['embedThumbnail'])
    embedMessage.setColor(module['embedMsg']['embedColor'])
    
    var embedFields = module['embedMsg']['embedFields']
    for (j in embedFields) {
        embedMessage.addField(embedFields[j]['name'], embedFields[j]['value'])
    }
    return embedMessage
}

function getBotModules() {
    return config.bot.modules
}

module.exports = {
    setClientInfo,
    getEmbedMessage,
    getBotModules,
    createNewTicket
}
