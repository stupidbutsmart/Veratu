const youtubeSearch = require("yt-search");
const ytdl = require("ytdl-core");
const { Stream } = require("./../../utils/currentqueue");
module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const id = voiceChannel.id;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    else {
      try {
        Stream[id][0]++;
        const connection = await voiceChannel.join();
        const play = async (connection, stream) => {
          message.channel.send(
            `Playing **${Stream[id][Stream[id][0]].title}**`
          );
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
        const stream = ytdl(Stream[id][Stream[id][0]].url, {
          filter: "audioonly",
        });
        message.channel.send(
          `Skipped **${Stream[id][Stream[id][0] - 1].title}**`
        );
        play(connection, stream);
      } catch (error) {
        console.log(error);
        return message.channel.send("There was an error skipping the song.");
      }
    }
  },
  description: "",
  aliases: [],
};
