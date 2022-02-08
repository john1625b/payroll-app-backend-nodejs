const app = require('../index')
const request = require('supertest')
const sinon = require('sinon')
const payrollReport = require('../controllers/payroll-report')

describe('Tests payroll app', () => {
    it('should query /payroll-report', async () => {
        const res = await request(app)
            .get('/payroll-report')
        expect(res.statusCode).toEqual(200)
    })
})