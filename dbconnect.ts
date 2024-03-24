import mysql from "mysql";
import util from "util";


export const conn = mysql.createPool(
    {
        connectionLimit: 10,
        host: "sql6.freemysqlhosting.net",
        user: "sql6693918",
        password: "b3u3DsLYzX",
        database: "sql6693918",
    }
);
export const queryAsync = util.promisify(conn.query).bind(conn);
