import help from "./commands/help";
import {allowedPeopleThatCanAddEvents, allowedChannels} from "./constants";
import plan from "./commands/plan";

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

(async () => {
    const commands = [
        {c: "help", e: help},
        {c: "plan", e: plan},
    ];


    db.defaults({events: []})
        .write();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', async(msg) => {
        if (msg.author.id !== client.user.id) {

            if (
                allowedChannels
                    .filter(x => x === Number(msg.channel.id.toString()))
                    .length > 0
            ) {
                if (msg.content.startsWith("-l")) {
                    const command = msg.content.split(" ")[1];
                    if (!!command === false) return msg.reply("Invalid command");
                    if (commands.filter(x => x.c === command).length > 0) return await (commands.filter(x => x.c === command)[0]).e(client, msg, db);
                    return msg.reply("Invalid command");
                }

            }

        }
    });

    await client.login(process.env.DISCORD_BOT_TOKEN);
})();

