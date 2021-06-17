module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      message.channel.send("You dont have the right permissions");
    else if (!args) message.channel.send("Who are you going to kick?");
    else if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      message.channel.send("I do not have permissions to ban a user.");
    else {
      //banning process
      const member = message.mentions.members.first();
      if (!member) return message.channel.send("No such user found!");
      try {
        await member.kick();
        message.channel.send(member.user.tag + " has been kicked!");
      } catch (error) {
        message.channel.send(
          "I do not have high enough role hiechery to kick them."
        );
      }
    }
  },
  aliases: ["k"],
  description: "This is a command that will kick a user",
};
