const request = require('supertest');
const app = require('../../app');

describe('Distributor Controller', () => {
    let distributorId;

    // Test the POST endpoint
    it('should create a distributor', async () => {
        const res = await request(app)
            .post('/api/distributors/create')
            .send({
                name: 'Test Distributor'
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toHaveProperty('name', 'Test Distributor');
        distributorId = res.body._id;

    })

})