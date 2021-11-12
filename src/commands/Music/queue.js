module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    const { Stream, loopStream } = require("./../../utils/currentqueue");
    let name = ["Queue:"];
    if (Stream.hasOwnProperty(voiceChannel.id)) {
      for (let i = 1; i < Stream[voiceChannel.id].length; i++) {
        name.push(`**#${i} ${Stream[voiceChannel.id][i].title}**`);
      }
    } else {
      for (let i = 1; i < loopStream[voiceChannel.id].length; i++) {
        name.push(`**#${i} ${loopStream[voiceChannel.id][i].title}**`);
      }
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
