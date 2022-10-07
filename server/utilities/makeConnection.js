const mysql = require("mysql");
const util = require("util");

function makeConnection() {
  const con = mysql.createConnection({
    host: "localhost",
    user: "server",
    password: "serverushnt54",
    database: "users",
  });

  const connect = util.promisify(con.connect).bind(con);
  const query = util.promisify(con.query).bind(con);
  const end = util.promisify(con.end).bind(con);

  return { connect, query, end };
}

module.exports = makeConnection;
