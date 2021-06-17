module.exports = {
  run: async (client, message, args) => {
    if (!args) message.channel.send("Who do you want to mute?");
    else if (!message.member.hasPermission("MANAGE_ROLES"))
      message.channel.send(
        "You do not have the right permissions to mute a user!"
      );
    else if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      message.channel.send(
        "I do not have the right permissions to mute a user!"
      );
    else {
      const role = message.guild.roles.cache.find((r) => r.name === "Muted");
      if (!role) return message.channel.send("No Muted role found");
      const member = message.mentions.members.first();
      await member.roles.add(role);
      message.channel.send(`${member.user.tag} has been muted.`);
    }
  },
  aliases: ["m"],
  description: "This command will permanently mute someone",
};
