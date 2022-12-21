module.exports = async (client) => {
  const ms = require("ms");
  require("dotenv").config();
  console.log(`${client.user.tag} is online at ${client.readyAt}`);
  client.user.setPresence({ activity: { name: "with $help" }, status: "idle" });
};
