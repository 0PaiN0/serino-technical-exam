import {mysqlCredential} from "../config";
import {Sequelize} from "sequelize";

export const db = new Sequelize(
    mysqlCredential.DB,
    mysqlCredential.USER,
    mysqlCredential.PASSWORD,
    {
        host: mysqlCredential.HOST,
        dialect: mysqlCredential.DIALECT,
    }
);

