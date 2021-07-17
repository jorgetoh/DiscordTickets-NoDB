# Reactive Ticket System [discord.js]
This is a simple ticket system for discord. (Still under development 20%)
<p align="center">
  <img src="https://i.imgur.com/7GZzPdd.png"/>
</p>

## Dependencies
This bot is built with Node.js (v-14.16.1) and discord.js (v-12.5.3) with the add-on discord-buttons (v-4.0.0)

## Installation
To keep everything as simple as possible, everything is configurable on [config.json](config.json)

  1. First of all, you need to choose how many modules you want. (You must create a channel and a category for each module you use)
  2. Then, on [config.json](config.json) you must set the bot token and the channels/categories IDs in their modules.
  3. When you set everything up, you can run the bot using "node index.js"

### Module syntax 
To add new modules you must add this to the json list: "modules"
```json
{
    "prefix": "example",
    "creation-channelID": "864473895049625609",
    "tickets-categoryID": "864626016239616013",
    "embedMsg": {
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
