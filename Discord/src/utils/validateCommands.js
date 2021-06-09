module.exports.checkModule = (cmdName, cmdModule) => {
  if (!cmdModule.hasOwnProperty("run"))
    throw new Error(`@${cmdName} , run is not a property`);
  if (!cmdModule.hasOwnProperty("description"))
    throw new Error(`@${cmdName} , description is not a property`);
  if (!cmdModule.hasOwnProperty("aliases"))
    throw new Error(`@${cmdName} , aliases is not a property`);
  return true;
};
module.exports.checkProperty = (cmdName, cmdModule) => {
  if (!typeof cmdModule.run === "function")
    throw new Error(`@${cmdName} , run is not a function`);
  if (!typeof cmdModule.description === "string")
    throw new Error(`@${cmdName} , description is not a string`);
  if (!Array.isArray(cmdModule.aliases))
    throw new Error(`@${cmdName} , aliases is not an array`);
  return true;
};
