module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      message.channel.send("You do not have the right permissions!");
    else if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      message.channel.send("I do not have the right permissions.");
    else if (!args[0])
      message.channel.send("Please specify who you want to add a role to.");
    else if (!args[1])
      message.channel.send(
        "Please specify what role you want to add to the specified user."
      );
    else {
      let member = message.mentions.members.first();
      let role = message.guild.roles.cache.find((r) => r.name === args[1]);
      if (!role) {
        return message.channel.send("There is no such role found!");
      }
      if (!member) {
        return message.channe.send("There is no such user found!");
      }
      await member.roles.add(role);
      message.channel.send("The role has been added!");
    }
  },
  aliases: ["roleadd", "rolegive"],
  description: "forcefully adds a role to a user.",
};
