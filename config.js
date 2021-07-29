const Discord = require('discord.js')
const config = require('./config.json')

var ticketAmount = 0

function createNewTicket(module, guild, user) {
    ticketAmount += 1
    guild.channels.create(`${module['prefix']}-${ticketAmount}`, {
        type: 'text',
        parent: module['tickets-categoryID'],
        permissionOverwrites: [
            {
                id: guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: user.id,
                allow: ['VIEW_CHANNEL'],
            },
        ]
    }).then(channel => {

        let strRoles = 'The role(s): '
        let roleList = module['rolesID']
        for (j in roleList) {
            strRoles = strRoles.concat(`<@&${roleList[j]['roleID']}>, `)
            channel.updateOverwrite(guild.roles.cache.get(roleList[j]['roleID']), { VIEW_CHANNEL: true })

        }
        strRoles = strRoles.substring(0, strRoles.length-2)
        strRoles = strRoles.concat(' can view your ticket.')

        let embedMessage = new Discord.MessageEmbed()
            .setTitle(`Ticket #${ticketAmount} (${module.prefix})`)
            .setDescription(`${user} thanks you for contacting us. Help will be delivered soon.`)
            .setThumbnail(module['creationEmbed']['embedThumbnail'])
            .setColor(module['creationEmbed']['embedColor'])
        
        embedMessage.addField('STAFF Contacted', strRoles)

        channel.send(embedMessage).then(message => {
            message.react('🔒')
        })
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

function getCreationEmbed(module) {
    let embedMessage = new Discord.MessageEmbed()
        .setTitle(module['creationEmbed']['embedTitle'])
        .setDescription(module['creationEmbed']['embedDesc'])
        .setThumbnail(module['creationEmbed']['embedThumbnail'])
        .setColor(module['creationEmbed']['embedColor'])
    
    let embedFields = module['creationEmbed']['embedFields']
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
    getCreationEmbed,
    getBotModules,
    createNewTicket
}
