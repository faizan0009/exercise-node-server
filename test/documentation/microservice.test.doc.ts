import chaiHttp = require('chai-http');
import { request, expect, use } from 'chai';

use(chaiHttp)

describe('Microservice', function(): void {
	before( function(done: MochaDone): void {done()})
	after(function(done: MochaDone): void {done()})

	describe('Methods: ', function(): void  {
		it('should return Microservice Method', function(done: MochaDone): void {
			request(`http://localhost:${process.env.PORT || 3002}${process.env.BASE_URI || '/api/v1/microservice'}`)
			.post('/greeting')
			.send({greeting: 'hello out there'})
			.then((data) => {
				expect(data.status).to.equal(200)
				expect(data).to.be.an('object')
				done()
			}).catch(err => {done(err)})
		})
	})
})