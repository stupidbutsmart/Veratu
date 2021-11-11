const youtubeSearch = require("yt-search");
const ytdl = require("ytdl-core");
module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!args[0]) return;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    try {
      const connection = await voiceChannel.join();
      const video = await (await youtubeSearch(args.join(" "))).videos[0];
      if (video) {
        const stream = await ytdl(video.url, { filter: "audioonly" });
        connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
          return;
        });
        message.channel.send(`Playing ${video.title}`);
      }
    } catch (err) {
      console.log(err);
    }
  },
  description:
    "This command will play a song and will join a vc if it is not in one.",
  aliases: ["p"],
};
