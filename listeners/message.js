module.exports = async (client, message) => {
    if(message.type === "PINS_ADD" && message.author.id === client.user.id) {
        message.delete()
    }
}