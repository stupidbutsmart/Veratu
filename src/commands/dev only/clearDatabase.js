module.exports = {
  run: async (client, message, args) => {
    if (message.author.id != 541552527427239940) return;
    const db = require("./../../utils/db");
    if (!args) {
      return message.reply("Which collection would you like to delete?");
    }
    await db.getDB().collection(args[0]).remove({});
    message.channel.send(
      `I have deleted a collection with the name ${args[0]}`
    );
  },
  aliases: ["cleardatabase", "cleardb", "dbclear"],
  description: "This command will clear the database of a certain collection",
};
