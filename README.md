# Ticket System [discord.js] (No database)

This is a simple ticket system for discord. 
I coded this bot because all the tickets systems out there had to many unnecessary features and all of them required a database to work properly.
<p align="center">
  <img src="https://i.imgur.com/7GZzPdd.png"/>
</p>

## Dependencies
This bot is built with Node.js (v-14.16.1) and discord.js (v-12.5.3) (No database required)

## Installation
To keep everything as simple as possible, everything is configurable on [config.json](config.json)

  * You can find a better explanation at this tutorial: www.youtube.com/jorgetoh

  1. First of all, you need to setup the discord server with the ticket creation channels and their respective categories. (To allow everything to work properly, nobody should be allowed to pin messages on the creation channels)
  2. With the developer mode you should be able to copy the channels ID and set everything up on the [config.json](config.json)
  3. You can touch up the embed messages on [config.json](config.json) to set it as your liking.
  4. You should change the rolesID section to let your staff view the tickets. (You must use roles ID)
  5. Set your bot token on the info section ([config.json](config.json)) and everything is ready to go.

NOTE: The creation embed messages will be sent if they are not found in their respective channels when the bot starts so if you want to modify one, just delete it and reload the bot.
 
### Ticket Modules
Ticket modules allow you to have several independent ticket systems on the same server.

To add new modules you must add a new entry on the config section "modules"
```json
{
    "prefix": "example",
    "creation-channelID": "864473895049625609",
    "tickets-categoryID": "864626016239616013",
    "rolesID": [
        {"roleID": "864476652885114881"},
        {"roleID": "866017913675579403"},
        {"roleID": "866017969774264350"}
    ],
    "creationEmbed": {
        "embedTitle":"Title",
        "embedDesc": "Description.",
        "embedThumbnail": "https://i.imgur.com/koH8WF8.png",
        "embedColor": "0x1b982e",
        "embedFields": [
            {
                "name": "Field name #1",
                "value": "Field value #1"
            },
            {
                "name": "Field name #2",
                "value": "Field value #2"
            }
        ]
    }
}
```
