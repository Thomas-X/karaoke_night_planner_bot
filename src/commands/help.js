export default async (client, msg, db) => {
    return client.channels.get(msg.channel.id).send("Here some help\n I do things");
}