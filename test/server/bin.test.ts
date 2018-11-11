import chaiHttp = require('chai-http');
import { request, expect, use } from 'chai';
import { server, app } from '../../src/bin/server'

use(chaiHttp)

describe('Microservice', function(): void {
	before( function(done: MochaDone): void {done()})
	after(function(done: MochaDone): void {done()})

	describe('Simplus - Standard: ', function(): void  {
		it('should return a 200 response', function(done: MochaDone): void {
			request(server).get(`${app.locals.baseUri}/ping`).then((data) => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
		it('should return the solution blueprint', function(done: MochaDone): void {
			request(server).get(`${app.locals.baseUri}/blueprint`).then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
		it('should return the solution code documentation', function(done: MochaDone): void {
			request(server).get(`${app.locals.baseUri}/documentation`).then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
		it('should return the solution code test suite', function(done: MochaDone): void {
			request(server).get(`${app.locals.baseUri}/tests`).then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
	})
})