import app from "../server";
import supertest from 'supertest'
describe('GET /', ()=> {
    it('should send back hello', async () => {
        const res = await supertest(app)
        .get('/')

        expect(res.status).toBe(200)
        expect(res.body.message).toBe("Hello")
    })

})