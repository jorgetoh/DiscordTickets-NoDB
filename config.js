const Discord = require('discord.js')
const config = require('./config.json')

var usersArray = []

async function createNewTicket(module, guild, user) {
    if (usersArray.includes(user.id)) {
        return
    }
    usersArray.push(user.id)

    await guild.channels.create(`${module['prefix']}-${user.username}`, {
        type: 'text',
        parent: module['tickets-categoryID'],
        permissionOverwrites: [
            {
                id: guild.roles.everyone.id,
                deny: ['VIEW_CHANNEL', 'MANAGE_MESSAGES'], 
            },
            {
                id: user.id,
                allow: ['VIEW_CHANNEL'],
            },
        ]
    }).then(channel => {
        strRoles = 'The role(s): '
        roleList = module['rolesID']
        for (j in roleList) {
            strRoles = strRoles.concat(`<@&${roleList[j]['roleID']}>, `)
            channel.updateOverwrite(guild.roles.cache.get(roleList[j]['roleID']), { VIEW_CHANNEL: true })

        }
        strRoles = strRoles.substring(0, strRoles.length-2)
        strRoles = strRoles.concat(' can view your ticket.')

        embedMessage = new Discord.MessageEmbed()
            .setTitle(`Ticket - ${user.username} (${module.prefix})`)
            .setDescription(`${user} thanks you for contacting us. Help will be delivered soon.`)
            .setThumbnail(module['creationEmbed']['embedThumbnail'])
            .setColor(module['creationEmbed']['embedColor'])
        
        embedMessage.addField('STAFF Contacted', strRoles)
        channel.send(`Ticket created by: ${user}`)
        channel.send(embedMessage).then(message => {
            message.react('🔒')
            message.pin()
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
    embedMessage = new Discord.MessageEmbed()
        .setTitle(module['creationEmbed']['embedTitle'])
        .setDescription(module['creationEmbed']['embedDesc'])
        .setThumbnail(module['creationEmbed']['embedThumbnail'])
        .setColor(module['creationEmbed']['embedColor'])
    
    embedFields = module['creationEmbed']['embedFields']
    for (j in embedFields) {
        embedMessage.addField(embedFields[j]['name'], embedFields[j]['value'])
    }
    return embedMessage
}
function getDeletedEmbed() {
    embedMessage = new Discord.MessageEmbed()
        .setTitle(config.bot.closeTicket.embedTitle)
        .setThumbnail(config.bot.closeTicket.embedThumbnail)
        .setDescription(config.bot.closeTicket.embedDesc)
        .setColor(0xa31a10)

    return embedMessage
}


function getBotModules() {
    return config.bot.modules
}

module.exports = {
    setClientInfo,
    getCreationEmbed,
    getBotModules,
    createNewTicket,
    getDeletedEmbed,
    usersArray
}
