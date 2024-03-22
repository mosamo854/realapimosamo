import mysql from "mysql";
import util from "util";


export const conn = mysql.createPool(
    {
        connectionLimit: 10,
        host: "localhost",
        user: "project2",
        password: "1234",
        database: "project_fakemash",
    }
);
export const queryAsync = util.promisify(conn.query).bind(conn);