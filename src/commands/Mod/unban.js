module.exports = {
  run: async (client, message, args) => {
    const db = require("./../../utils/db");
    const filter = { banId: args[0] };
    const collectionName = "Bans";
    if (!message.member.hasPermission("BAN_MEMBERS"))
      message.channel.send("You dont have the right permissions");
    else if (!args) message.channel.send("Who are you going to ban?");
    else if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      message.channel.send("I do not have permissions to ban a user.");
    else {
      db.getDB()
        .collection(collectionName)
        .findOneAndDelete(filter, async (err, result) => {
          if (err) throw err;
          if (result.value === null) {
            message.channel.send("There is no Ban found in the database.");
          } else {
            let memberID = await Object.keys(result.value)[2];
            await message.guild.members.unban(memberID);
            message.channel.send("That user is unbanned.");
          }
        });
    }
  },
  aliases: [],
  description: "This command will unban a user.",
};
