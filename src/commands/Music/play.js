const youtubeSearch = require("yt-search");
const ytdl = require("ytdl-core");
const { Stream } = require("./../../utils/currentqueue");
module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!args[0]) return;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    try {
      const connection = await voiceChannel.join();
      const video = await (await youtubeSearch(args.join(" "))).videos[0];
      const play = async (connection, stream) => {
        message.channel.send(`Playing **${Stream[0].title}**`);
        connection
          .play(stream, { seek: 0, volume: 1 })
          .on("finish", async () => {
            Stream.shift();
            if (Stream.length === 0) return;
            else {
              const stream2 = await ytdl(Stream[0].url, {
                filter: "audioonly",
              });
              play(connection, stream2);
            }
          });
      };
      if (video) {
        if (Stream.length == 0) {
          Stream.push(video);
          const stream = await ytdl(Stream[0].url, { filter: "audioonly" });
          play(connection, stream);
        } else {
          Stream.push(video);
          message.channel.send(`Queued **${Stream[Stream.length - 1].title}**`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  description:
    "This command will play a song and will join a vc if it is not in one.",
  aliases: ["p"],
};
