module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const { Stream } = require("./../../utils/currentqueue");
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    else {
      try {
        await voiceChannel.leave();
        Stream.splice(0, Stream.length);
        message.channel.send(`I have left ${voiceChannel}`);
      } catch (err) {
        return message.channel.send("I am not in a voice channel.");
      }
    }
  },
  description: "This command will disconnect a bot from a channel.",
  aliases: ["dc", "disconnect"],
};
