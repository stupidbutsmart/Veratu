module.exports = {
  run: async (client, message, args) => {
    const ms = require("ms");
    let time = args[1];
    if (!args[0]) message.channel.send("Who do you want to mute?");
    else if (!time)
      message.channel.semd("How long do you want to mute them for?");
    else if (!message.member.hasPermission("MANAGE_ROLES"))
      message.channel.send(
        "You do not have the right permissions to mute a user!"
      );
    else if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      message.channel.send(
        "I do not have the right permissions to mute a user!"
      );
    else {
      const member = message.mentions.members.first();
      const role = message.guild.roles.cache.find((r) => r.name === "Muted");
      await member.roles.add(role);
      message.channel.send(`${args[0]} has been muted!`);
      setTimeout(() => {
        member.roles.remove(role);
      }, ms(time));
    }
  },
  aliases: ["tmute"],
  description: "This command will temporarily mute a user.",
};
