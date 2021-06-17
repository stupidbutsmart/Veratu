module.exports = {
  run: async (client, message, args) => {
    const db = require("./../../utils/db");
    if (args[0] === "open" || args[0] === "create") {
      const filter = JSON.parse(`{"${message.author.tag}" : "true"}`);
      db.getDB()
        .collection("Tickets")
        .findOne(filter, (err, result) => {
          if (err) throw err;
          if (result) {
            return message.channel.send("You already have a ticket open.");
          } else {
            message.guild.channels
              .create(`${message.author.username} ticket`, {
                type: "text",
                permissionOverwrites: [
                  // permissions
                  {
                    allow: "VIEW_CHANNEL",
                    id: message.author.id,
                  },
                  {
                    deny: "VIEW_CHANNEL",
                    id: message.guild.id, //prevents guild(@everyone) from viewing the ticket contents
                  },
                ],
              })
              .then((channel) => {
                const data = JSON.parse(
                  `{"${message.author.tag}" : "true","${message.author.id}" : "${channel.id}"}`
                );
                db.getDB()
                  .collection("Tickets")
                  .insertOne(data, async (err, result) => {
                    if (err) throw err;

                    const m = await message.channel.send("Ticket created!");
                    m.delete({ timeout: 3000 });
                  });
              });
          }
        });
    } else if (args[0] === "close" || args[0] === "delete") {
      const filter = JSON.parse(`{"${message.author.tag}" : "true"}`);
      db.getDB()
        .collection("Tickets")
        .findOne(filter, async (err, result) => {
          if (err) throw err;
          if (!result) {
            return message.channel.send("You dont have a ticket to close.");
          } else {
            await message.guild.channels.cache
              .get(result[message.author.id])
              .delete();
            db.getDB()
              .collection("Tickets")
              .findOneAndDelete(filter, (err, result) => {
                if (err) throw err;
              });
            const msg = await message.channel.send(
              "I have deleted the ticket."
            );
            msg.delete({ timeout: 3000 });
          }
        });
    } else {
      message.channel.send("Would you like me to close or open a ticket?");
    }
  },
  aliases: [],
  description:
    "This command will create a channel that only mods and the author will see.",
};
