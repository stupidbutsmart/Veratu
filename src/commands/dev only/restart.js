module.exports = {
  run: async (client, message, args) => {
    if(message.author.id != 541552527427239940) return;
    require("dotenv").config();
    const m = await message.channel.send("Restarting...");
    client.destroy();
    client.login(process.env.TOKEN);
    m.edit("Restarted!");
  },
  aliases: [],
  description: "This command will restart the client",
};
