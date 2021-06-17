module.exports = async (client) => {
  console.log(`${client.user.tag} is online at ${client.readyAt}`);
  client.user.setPresence({ activity: { name: "with $help" }, status: "idle" });
};
