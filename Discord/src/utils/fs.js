const fs = require("fs");
module.exports.Log = async (errMessage) => {
  fs.appendFile("./../../Logs.txt", errMessage, (err) => {
    if (err) throw err;
  });
};
