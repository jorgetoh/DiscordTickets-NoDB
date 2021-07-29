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
    switch (reaction.emoji.name) {
        case '📩':
            var botModules = config.getBotModules()
            for (i in botModules) {
                if (botModules[i]['creation-channelID'] === message.channel.id) {
                    reaction.users.remove(user.id)
                    config.createNewTicket(botModules[i], message.guild, user)
                    return
                }
            }
            break
        case '🔒':
            var botModules = config.getBotModules()
            for (i in botModules) {
                if (botModules[i]['tickets-categoryID'] === message.channel.parent.id) {
                    reaction.users.remove(user.id)
                    message.channel.send('Removing ticket in 5 seconds...')
                    setTimeout(function(){ 
                        message.channel.delete()
                     }, 5000);
                    return
                }
            }
            break
    }
}
