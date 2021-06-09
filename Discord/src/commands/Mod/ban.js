module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      message.channel.send("You dont have the right permissions");
    else if (!args) message.channel.send("Who are you going to ban?");
    else if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      message.channel.send("I do not have permissions to ban a user.");
    else {
      //banning process
      const member = message.mentions.members.first();
      if (!member) return message.channl.send("No such user found!");
      args.shift(); //gets rid of the mentions when sending the reason
      let reason = args.join(" ");
      const banId = Math.random().toString();
      if (!message.author.bot)
        await member.send(
          `You have been banned at ${message.createdAt} for: **${reason}**\n Your BanId: ${banId}`
        );
        try {
            member.ban();
            message.channel.send(member.user.tag + " has been banned");
            // Log ban into database
            const data = JSON.parse(
              `{"${member.id} ": { "banId" : "${banId}" , "reason" : "${reason}"}}`
            );
            const db = require("./../../utils/db");
            db.getDB()
              .collection("Bans")
              .insertOne(data, (err, result) => {
                if (err) throw err;
                else
                  console.log(
                    "A ban has been logged into the database\n" + result.ops[0]
                  );
              });
  
          } catch (err) {
            message.channel.send('I do not have high enough role hiechery to ban them.')
          }
      }
  },
  aliases: ["b"],
  description: "This is a command that will ban a user",
};
