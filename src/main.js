//all imports
require("dotenv").config();
const { checkModule, checkProperty } = require("./utils/validateCommands");
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const db = require("./utils/db");
const fs = require("fs").promises;
const path = require("path");
client.commands = new Map();

// database connection function
db.connect((err) => {
  if (err) {
    throw new Error("Unable to connect to database"); //check for error
  } else {
    console.log("Connected to database.\nConnecting to client...");
    //API connect
    client.login(process.env.TOKEN).catch((err) => {
      console.log("There was an error connecting to the API:" + err);
    });
  }
});
// initialising commands and events registrations
(async function registerCommands(dir = "commands") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (const file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) registerCommands(path.join(dir, file));
    else {
      if (file.endsWith(".js")) {
        let cmdName = file.substring(0, file.indexOf(".js"));
        try {
          let cmdModule = require(path.join(__dirname, dir, file));
          if (
            checkModule(cmdName, cmdModule) &&
            checkProperty(cmdName, cmdModule)
          ) {
            let { aliases } = cmdModule;
            client.commands.set(cmdName, cmdModule.run);
            if (aliases.length !== 0) {
              aliases.forEach((alias) =>
                client.commands.set(alias, cmdModule.run)
              );
            }
          }
        } catch (err) {
          console.log(
            `${cmdName} has failed to load and threw the following error: \n\n${err}`
          );
        }
      }
    }
  }
})();
(async function registerEvents(dir = "events") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) registerEvents(path.join(dir, file));
    else {
      if (file.endsWith(".js")) {
        let eventName = file.substring(0, file.indexOf(".js"));
        try {
          let eventModule = require(path.join(__dirname, dir, file));
          client.on(eventName, eventModule.bind(null, client));
        } catch (err) {
          console.log(
            `${eventName} failed to load and threw the following error: \n\n ${err}`
          );
        }
      }
    }
  }
})();
client.login(process.env.TOKEN);
// // testing grounds
// client.on("message", (m) => {
//   m.mentions.members.first().voice.setChannel();
// });
