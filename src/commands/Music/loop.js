const ytdl = require("ytdl-core");
const { Stream, loopStream } = require("./../../utils/currentqueue");
module.exports = {
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    const id = voiceChannel.id;
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel.");
    else {
      if (!Stream.hasOwnProperty(id))
        return message.channel.send("There is no queue to loop.");
      else {
        try {
          message.channel.send("Looping Queue...");
          const connection = await voiceChannel.join();
          loopStream[id] = Stream[id];
          delete Stream[id];
          const play = async (connection, stream) => {
            message.channel.send(
              `Playing **${loopStream[id][loopStream[id][0]].title}**`
            );
            connection
              .play(stream, { seek: 0, volume: 1 })
              .on("finish", async () => {
                loopStream[id][0]++;
                if (loopStream[id][0] === loopStream[id].length) {
                  loopStream[id][0] = 1;
                }
                const stream2 = await ytdl(
                  loopStream[id][loopStream[id][0]].url,
                  {
                    filter: "audioonly",
                  }
                );
                play(connection, stream2);
              });
          };
          const stream = ytdl(loopStream[id][loopStream[id][0]].url, {
            filter: "audioonly",
          });
          await play(connection, stream);
        } catch (err) {
          console.log(err);
          return message.channel.send(
            "There was an error when executing this command please try again later."
          );
        }
      }
    }
  },
  description: "This command will loop the queue.",
  aliases: [],
};
