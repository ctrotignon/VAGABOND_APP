"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronizeDb = exports.checkDbConnection = exports.sequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, PORT_DB } = process.env;
if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !PORT_DB) {
    throw new Error("Les variables d'environnement nécessaires ne sont pas définies.");
}
exports.sequelizeConnection = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: Number(PORT_DB),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
const checkDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('test connections');
        yield exports.sequelizeConnection.authenticate();
        console.log('Connection has been established successfully !');
    }
    catch (error) {
        throw new Error(`Unable to connect to the database: ${error}`);
    }
});
exports.checkDbConnection = checkDbConnection;
const synchronizeDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelizeConnection.sync();
        // await sequelizeConfig.sync({alter : true});
        console.log('All models were synchronized successfully');
    }
    catch (error) {
        throw new Error(`Unable to synchronize the database : ${error}`);
    }
});
exports.synchronizeDb = synchronizeDb;
