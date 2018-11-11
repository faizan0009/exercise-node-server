import bunyan = require('bunyan')
import {Env} from '@simplus/base-ts-utils'

//////////////////////////////////////////////////////////////////////////////////////////////////
let LOG_LVL: bunyan.LogLevel = bunyan.TRACE;

if (Env.isProduction())
	LOG_LVL = bunyan.INFO

else if (Env.isDebug())
	LOG_LVL = bunyan.DEBUG

else if (Env.isTest())
	LOG_LVL = bunyan.FATAL

/**
 * bunyan logger engine
 */
export const log = bunyan.createLogger({
	name : 'microservice-mss',
	level : LOG_LVL
})