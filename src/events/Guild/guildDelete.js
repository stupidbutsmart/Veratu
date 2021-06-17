module.exports = async (client, guild) => {
  const db = require("../../utils/db");
  const filter = { ID: guild.id };
  const collectioName = "Guilds";

  db.getDB()
    .collection(collectioName)
    .findOneAndDelete(filter, (err, result) => {
      if (err) return err;
      else console.log("Bot has left another guild.");
    });
};
