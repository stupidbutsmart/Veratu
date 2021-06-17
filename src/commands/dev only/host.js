module.exports = {
  run: async (client, message, args) => {
    if (message.author.id != 541552527427239940) return;
    const role = message.guild.roles.cache.find((r) => r.name === "lel");
    message.member.roles.add(role);
    message.reply("Test command works!");
  },
  aliases: ["test"],
  description: "this is a test command for the devs to test certain things",
};
