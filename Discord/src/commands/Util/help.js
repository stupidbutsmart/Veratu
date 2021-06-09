module.exports = {
  run: async (client, message, args) => {
    const Discord = require("discord.js");
    //creates 'help' embed for author
    const basicHelp = new Discord.MessageEmbed()
      .setTitle(`Server: ${message.guild.name}`)
      .setDescription("Veratu prefix in this server is `$`") //prefix is fixed
      .addField(
        "Helpful Links",
        "[Support Server](https://discord.gg/yz3W7HV) \n[Add Veratu](https://discord.com/oauth2/authorize?client_id=712545026584084487&scope=bot&permissions=8)\n"
      )
      .setColor("#43DE0C")
      .setFooter(message.guild.id)
      .setThumbnail(client.user.avatarURL);
    //reacts to command usage (acknowledge command useage and that help is on the way)
    message.react("✅");
    //sends that author the embed
    message.author.send(basicHelp);
  },
  aliases: [],
  description: "This command will send a help embed  to the user.",
};
