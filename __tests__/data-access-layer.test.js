const {mockDb} = require('../services/clients')
const DataAccessLayer = require('../services/data-access-layer')
const expect = require('chai').expect;
const DAL = new DataAccessLayer(mockDb)

describe('tests DAL with mock data', () => {
    beforeEach(() => {
        DAL.deleteEmployeeTable()
    });

    it('should insert into mock db', async () => {
        const csvRows = [
            {
                date: '2023-01-04',
                'hours worked': '10',
                'employee id': '1',
                'job group': 'A'
            },
            {
                date: '2023-01-14',
                'hours worked': '5',
                'employee id': '1',
                'job group': 'A'
            },
            {
                date: '2023-01-20',
                'hours worked': '3',
                'employee id': '2',
                'job group': 'B'
            },
            {
                date: '2023-01-20',
                'hours worked': '4',
                'employee id': '1',
                'job group': 'A'
            },
            {
                date: '2023-01-20',
                'hours worked': '4',
                'employee id': '3',
                'job group': 'A'
            }
        ]
        DAL.insertIntoEmployee(csvRows)
    })

    afterEach(() => {
        const tableRowOutput = [
            { Date: '2023-01-04', Hours: 10, Id: 1, JobGroup: 'A' },
            { Date: '2023-01-14', Hours: 5, Id: 1, JobGroup: 'A' },
            { Date: '2023-01-20', Hours: 3, Id: 2, JobGroup: 'B' },
            { Date: '2023-01-20', Hours: 4, Id: 1, JobGroup: 'A' },
            { Date: '2023-01-20', Hours: 4, Id: 3, JobGroup: 'A' }
        ]
        DAL.getAllEmployee(
            (err, data) => {
                expect(data).to.deep.equal(tableRowOutput)
            }
        )
    });
})
