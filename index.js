const fs = require("fs");
const Discord = require('discord.js')
const config = require('./config.json')

const client = new Discord.Client()

fs.readdir("./listeners/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./listeners/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
     });
});

client.login(config.bot.info.token)