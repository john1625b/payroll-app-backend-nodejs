const express = require('express')
const router = express.Router()
const payrollReport = require('../controllers/payroll-report')

router.get('/payroll-report', payrollReport)

module.exports = router
