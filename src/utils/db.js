const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectId;
const url = "mongodb://localhost:27017"; 
const dbName = "Discord"; 
const mongoOption = {useNewUrlParser : true , useUnifiedTopology: true}
const state = {
  db: null,
};
const connect = (cb) => {
  if (state.db) cb();
  else {
    MongoClient.connect(
      url,
      mongoOption,
      (err, client) => {
        if (err) cb(err);
        else {
          state.db = client.db(dbName);
          cb();
        }
      }
    );
  }
};
const getPirmaryKey = (_id) => {
  return ObjectID(_id)
};
const getDB = () => {
  return state.db
};
module.exports = {
  getDB,
  getPirmaryKey,
  connect,
};
