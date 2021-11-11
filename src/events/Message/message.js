module.exports = async (client, message) => {
  const badWords = require("badwords-list");
  const prefix = "$";
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  // if (message.content === "hi")
  //   return message.channel.send(`Hi there <@!${message.author.id}>`);
  //Logs
  console.log(`${new Date()}\n${message.author.username}: ${message.content}`);
  //Message filtering
  let messageToAnalyse = message.content.split(" ");
  for (let i = 0; i < messageToAnalyse.length; i++) {
    try {
      if (badWords.array.includes(messageToAnalyse[i].toLowerCase())) {
        message.delete();
        message.reply("We are a family-friendly server! No cursing is allowed");
      }
    } catch (err) {}
  }
  //identifying and running commands
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmdName = args.shift();
  if (client.commands.get(cmdName)) {
    client.commands.get(cmdName)(client, message, args);
  }
};
