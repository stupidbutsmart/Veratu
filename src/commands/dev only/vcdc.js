module.exports = {
  run: async (client, message, args) => {
    if (message.author.id != 541552527427239940) return;
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("You need a voice channel.");
    if (!args[0])
      return message.channel.send("Who would you like to delete out of a vc?");
    if (args[0] === "clear") {
      client.removeListener("voiceStateUpdate", (oldMember, newMember) => {
        if (newMember.id === member.id && newMember.channelId !== null) {
          member.voice.setChannel(null);
        }
      });
      message.channel.send("All listeners have been cleared.");
    } else {
      const member = message.mentions.members.first();
      voiceChannel.join().catch(() => {
        return message.channel.send(
          "I do not have permissions to join the voice channel."
        );
      });
      client.on("voiceStateUpdate", (oldMember, newMember) => {
        if (newMember.id === member.id && newMember.channelId !== null) {
          member.voice.setChannel(null);
        }
      });
    }
  },
  description:
    "This command will disconnect the first argument when it joins the vc that the bot is in.",
  aliases: [],
};
