//all imports
require("dotenv").config();
const { checkModule, checkProperty } = require("./utils/validateCommands");
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("./utils/db");
const fs = require("fs").promises;
const f = require("./utils/fs");
const path = require("path");
client.commands = new Map();

// database connection function
db.connect((err) => {
  if (err) {
    f.Log(
      `[${new Date()}] Failed to Connect into the Database.\nError Message Given: ${err}\n`
    );
    throw new Error("Unable to connect to database"); //check for error
  } else console.log("Connected to database");
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

//API connect
client.login(process.env.TOKEN).catch((err) => {
  f.Log(
    `[${new Date()}] Failed to Login into the bot via API\n Error message given: ${err}\n`
  );
});