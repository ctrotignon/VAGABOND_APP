import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, PORT_DB } = process.env;

if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !PORT_DB) {
	throw new Error("Les variables d'environnement nécessaires ne sont pas définies.");
}

export const sequelizeConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
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

export const checkDbConnection = async () => {
	try {
		console.log('test connections');
		await sequelizeConnection.authenticate();
		console.log('Connection has been established successfully !');
	} catch (error) {
		throw new Error(`Unable to connect to the database: ${error}`);
	}
};

export const synchronizeDb = async () => {
	try {
		await sequelizeConnection.sync();
		// await sequelizeConfig.sync({alter : true});
		console.log('All models were synchronized successfully');
	} catch (error) {
		throw new Error(`Unable to synchronize the database : ${error}`);
	}
};
