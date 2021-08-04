const config = require('../config.js')

module.exports = async (client, reaction, user) => {
    
    if (reaction.message.partial) {
        await reaction.message.fetch()
    }
    if(reaction.partial) {
        await reaction.fetch()
    }
  
    message = reaction.message

    if (!message) {
        return
    } 
    if (user.bot) {
        return
    }
    switch (reaction.emoji.name) {
        case '📩':
            botModules = config.getBotModules()
            for (i in botModules) {
                if (botModules[i]['creation-channelID'] === message.channel.id) {
                    await reaction.users.remove(user.id)
                    await config.createNewTicket(botModules[i], message.guild, user)
                    return
                }
            }
            break
        case '🔒':
            botModules = config.getBotModules()
            for (i in botModules) {
                if (botModules[i]['tickets-categoryID'] === message.channel.parent.id) {
                    await reaction.users.remove(user.id)
                    await message.channel.send(config.getDeletedEmbed())
                    setTimeout(function(){
                        message.channel.delete()
                        index = config.usersArray.indexOf(user.id);
                        if (index > -1) {
                            config.usersArray.splice(index, 1);
                        }
                     }, 3000);
                    return
                }
            }
            break
    }
}
