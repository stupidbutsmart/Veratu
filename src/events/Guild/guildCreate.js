module.exports = async (client, guild) => {
  const db = require("./../../utils/db");

  const guildInfo = {
    ID: guild.id,
    Prefix: "$", //this is the default prefix
  };

  db.getDB()
    .collection("Guilds")
    .insertOne(guildInfo, (err, result) => {
      if (err) throw err;
      else console.log("Bot has joined another guild.");
    });
};
