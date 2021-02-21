const ezyjson = require("ezyjson");

const database = new ezyjson(`${__dirname}/database.json`);

module.exports = database;
