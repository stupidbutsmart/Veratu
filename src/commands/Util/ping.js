module.exports = {
  run: async (client, message, args) => {
    const m = await message.channel.send("Pinging...");
    setTimeout(async () => {
      m.edit(
        `Pong! ${Math.round(m.createdTimestamp - message.createdTimestamp)}ms`
      );
    }, 2000);
  },
  aliases: [],
  description: "This command will tell the user their internet ping.",
};
