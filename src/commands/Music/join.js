module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    else
      voiceChannel
        .join()
        .then(() => {
          return message.channel.send(`I have joined ${voiceChannel}`);
        })
        .catch(() => {
          return message.channel.send(
            "I do not have permissions to join the voice channel."
          );
        });
  },
  description:
    "This command will connect the bot the a channel that the user is in.",
  aliases: ["j"],
};
