const app = require('../app')
const request = require('supertest')

describe('Tests payroll-report', () => {
    it('should query /payroll-report', async () => {
        const res = await request(app)
            .get('/payroll-report')
        expect(res.statusCode).toEqual(200)
        console.log(res.body)
    })})