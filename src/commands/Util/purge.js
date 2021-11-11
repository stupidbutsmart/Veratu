const Discord = require("discord.js");
module.exports = {
  run: async (client, message, args) => {
    message.delete(); //deletes the sent command
    let amount = parseInt(args[0]);
    if (!amount)
      message.channel.send("How many messages would you like me to delete?");
    else if (!message.member.hasPermission("MANAGE_CHANNELS"))
      message.channel.send(
        "You do not have the right permissions to use this command!"
      );
    else if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      message.channel.send("I do not have the right permissions!");
    else if (amount < 1 || amount > 99)
      message.channel.send(
        "I cannot delete that amount of messages.\nI can only delete between 2 to 99 messages!"
      );
    else {
      try {
        await message.channel.bulkDelete(amount);
        const m = await message.channel.send(
          `I have deleted ${amount} messages.`
        );
        m.delete({ timeout: 3000 });
      } catch (err) {
        message.channel.send(
          "I cannot delete messages that are older than 14 days."
        );
      }
    }
  },
  aliases: ["clear"],
  description: "This command will bulk delete messages",
};
