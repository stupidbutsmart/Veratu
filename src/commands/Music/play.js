const youtubeSearch = require("yt-search");
const youtubeCore = require("ytdl-core");
module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!args[0]) return;
    if (!voiceChannel) 
      const connection = await voiceChannel.join().catch();
    const video = await youtubeSearch(args.join(" "));
    if(video) {
      const stream = youtubeCore(video.url , {filter: "audioonly"})
      connection.play(stream , {seek : 0 , volume: 1})
    }
  },
  description:
    "This command will play a song and will join a vc if it is not in one.",
  aliases: ["p"],
};
