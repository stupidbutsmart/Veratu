module.exports = async (client, oldUser, newUser) => {
  if (newUser.id == client.id) {
    setInterval(() => {
      for (let i = 0; i < Name.length; i++) {
        connection.play(Stream[i], { seek: 0, volume: 1 });
        message.channel.send(`Playing **${Name[i]}**`);
      }
    }, 1000);
  }
};
