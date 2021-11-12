module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    const { Stream } = require("./../../utils/currentqueue");
    let name = ["Queue:"];
    for (let i = 0; i < Stream.length; i++) {
      name.push(`**#${i + 1} ${Stream[i].title}**`);
    }
    if (name.length < 2) return;
    else {
      name.join("\n");
      message.channel.send(name);
    }
  },
  description:
    "This command will let users check the current music queue for the bot.",
  aliases: ["q"],
};
