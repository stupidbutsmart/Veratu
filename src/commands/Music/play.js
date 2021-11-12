const youtubeSearch = require("yt-search");
const ytdl = require("ytdl-core");
const { Stream } = require("./../../utils/currentqueue");
module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const id = voiceChannel.id;
    if (!args[0]) return;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    try {
      const connection = await voiceChannel.join();
      const video = await (await youtubeSearch(args.join(" "))).videos[0];
      const play = async (connection, stream) => {
        message.channel.send(`Playing **${Stream[id][Stream[id][0]].title}**`);
        connection
          .play(stream, { seek: 0, volume: 1 })
          .on("finish", async () => {
            Stream[id][0]++;
            if (Stream[id][0] === Stream[id].length)
              return voiceChannel.leave();
            else {
              const stream2 = await ytdl(Stream[id][Stream[id][0]].url, {
                filter: "audioonly",
              });
              play(connection, stream2);
            }
          });
      };
      if (video) {
        if (!Stream[id]) {
          Stream[id] = [1];
          Stream[id].push(video);
          const stream = await ytdl(Stream[id][1].url, { filter: "audioonly" });
          play(connection, stream);
        } else {
          Stream[id].push(video);
          message.channel.send(
            `Queued **${Stream[id][Stream[id].length - 1].title}**`
          );
        }
      }
    } catch (err) {
      message.channel.send("No such song was found.");
      console.log(err);
    }
  },
  description:
    "This command will play a song and will join a vc if it is not in one.",
  aliases: ["p"],
};
