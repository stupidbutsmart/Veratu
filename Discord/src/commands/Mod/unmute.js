module.exports = {
  run: async (client, message, args) => {
    if (!args[0]) message.channel.send("Who do you want to unmute?");
    else if (!message.member.hasPermission("MANAGE_ROLES"))
      message.channel.send(
        "You do not have the right permissions to unmute a user!"
      );
    else if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      message.channel.send(
        "I do not have the right permissions to unmute a user!"
      );
    else {
      const member = message.mentions.members.first();
      const role = message.guild.roles.cache.find((r) => r.name === "Muted");
      if (member.roles.cache.has(role)) {
        return message.channel.send("That user is not muted");
      }
      member.roles.remove(role);
      message.channel.send(`${args[0]} has been unmuted`);
    }
  },
  aliases: [],
  description: "This command will unmute a user.",
};
