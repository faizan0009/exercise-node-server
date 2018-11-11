import express = require('express')

//////////////////////////////////////////////////////////////////////////////////////////////////
// bin Server requirements
//////////////////////////////////////////////////////////////////////////////////////////////////
import { microservice } from '../microservice'
import { json } from 'body-parser'
import { Server } from 'http'
import { log } from '../log'
import { Env } from '@simplus/base-ts-utils'

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server initialization and middlewares
 */
export const app: express.Express = express()
app.locals.title = 'Application title'
app.locals.email = 'Developer@simplusinnovation.com'
app.locals.issues = 'https://bitbucket.org/simplusinnovation/microservice/issues'
app.locals.baseUri = process.env.BASE_URI || '/api/v1/microservice'

app.use(json())
app.use((_req: express.Request, res: express.Response, next: express.NextFunction): void => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
	next()
})

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server routing (Application)
 */
app.use(`${app.locals.baseUri}/`, microservice)

 //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server routing (Standard)
 */
app.get(`${app.locals.baseUri}/ping`, (_req: express.Request , res: express.Response) => {res.sendStatus(200)})
app.use(`${app.locals.baseUri}/blueprint`, express.static('docs/blueprint/', {extensions : ['html'], index : 'index.html'}))
app.use(`${app.locals.baseUri}/documentation`, express.static('docs/typedoc/', {extensions : ['html'], index : 'index.html'}))
app.use(`${app.locals.baseUri}/tests`, express.static('docs/tests/', {extensions : ['html'], index : 'index.html'}))

/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Error handling and logging
 */

const errorHandler: express.ErrorRequestHandler = (error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction ): void => {
	log.error(error)
	res.send(500)

	if ( Env.isDevelopment() )
		res.send(error)
	else
		res.end()
}

app.use(errorHandler)

/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Launch server
 */
export const SERVER_PORT = parseInt(process.env.PORT || '3002')
export const server: Server = app.listen( SERVER_PORT, '', (err: Error) => {
	if (err)
		log.error(err)
	else
		log.info('Server is running on port ', SERVER_PORT)
})