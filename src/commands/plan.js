import {allowedPeopleThatCanAddEvents} from "../constants";
import * as Long from "long";

// Usage: -l plan Something absolutely amazing
export default async (client, msg, db) => {
    // Some people can plan events
    console.log(allowedPeopleThatCanAddEvents[0].toInt());
    console.log(Long.fromValue(msg.author.id).toInt());
    if (
        allowedPeopleThatCanAddEvents
            .filter(x => x.toInt() === Long.fromValue(msg.author.id).toInt())
            .length > 0
    ) {
        let params = msg.content.split(" ");
        params.shift();
        params.shift();
        // title, date, description, attendees
        if (params.length < 4) return client.channels.get(msg.channel.id).send("Invalid amount of parameters");

        const user = await client.fetchUser(allowedPeopleThatCanAddEvents[0].toString());
        console.log(user);

        return client.channels.get(msg.channel.id).send(`yee ${user}`);
    } else {
        return msg.reply("Yo you're not allowed to use this command")
    }

}