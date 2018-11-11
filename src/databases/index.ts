//uncomment and configure lines below to connect database.

//////////////////////////////////////////////////////////////////////////////////////////////////
// Microservice database requirements
//////////////////////////////////////////////////////////////////////////////////////////////////
// import { ArangoDatabaseStorage } from '@simplus/facades-arango';
// import { log } from '../log';

// //////////////////////////////////////////////////////////////////////////////////////////////////
// /**
//  * Database initialization
//  */
// export const database: ArangoDatabaseStorage = new ArangoDatabaseStorage({
// 	connectionUrl: process.env.DB_CONNECTION_URL || 'http://localhost:8529/_db/_system',
// 	logLevel: 'error',
// })

// // connect to db
// database.connect()
// .then(() => { log.info('Mcroservice Database connected'); })
// .catch(() => {log.error('Mcroservice Database could not connect')})