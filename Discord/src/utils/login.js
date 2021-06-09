const c = require("ansi-colors");
const fs = require("fs").promises;
const path = require("path");
const commandStatus = [
  [`${c.bold("Commands")}`, `${c.bold("Status")}`, `${c.bold("Description")}`],
];
const eventStatus = [[`${c.bold("Events")}`, `${c.bold("Status")}`]];
async function registerCommands(client, dir = "") {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (const file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) registerCommands(path.join(dir, file));
    else {
      if (file.endsWith(".js")) {
        let cmdName = file.substring(0, file.indexOf(".js"));
        try {
          let cmdModule = require(path.join(__dirname, dir, file));
          let { aliases } = cmdModule;
          client.cmdName.set(`**$${cmdName}**`);
          client.commands.set(cmdName, cmdModule.run);
          if (aliases.length !== 0) {
            aliases.forEach((alias) =>
              client.commands.set(alias, cmdModule.run)
            );
          }
          commandStatus.push([
            `${cmdName}`,
            `${c.bgGreenBright("Success")}`,
            `${cmdModule.description}`,
          ]);
        } catch (err) {
          commandStatus.push([`${cmdName}`, `${c.bgRed("Failed")}`, ``]);
        }
      }
    }
  }
}
async function registerEvents(client, dir = "") {
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
          eventStatus.push([`${eventName}`, `${c.bgGreenBright("Success")}`]);
        } catch (err) {
          eventStatus.push([`${eventName}`, `${c.bgGreenBright("Success")}`]);
          console.log(err);
        }
      }
    }
  }
}
module.exports = {
  commandHandler: registerCommands,
  eventHandler: registerEvents,
  commandStatus: commandStatus,
  eventStatus: eventStatus,
};
