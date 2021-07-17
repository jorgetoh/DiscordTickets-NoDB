const config = require('../config.js')

module.exports = async (bot, reaction, user) => {
    
    if (reaction.message.partial) {
        await reaction.message.fetch()
    }
    if(reaction.partial) {
        await reaction.fetch()
    }
  
    let message = reaction.message
    if (!message) {
        return
    } 
    if (user.bot) {
        return
    }

    reaction.users.remove(user.id)
    var botModules = config.getBotModules()
    for (i in botModules) {
        if (botModules[i]['creation-channelID'] === message.channel.id) {
            config.createNewTicket(botModules[i], message.guild)
            return;
        }
    }
}