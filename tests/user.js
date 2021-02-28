const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();

chai.use(chaiHttp);

const { initiateTables } = require('../src/config/db');
initiateTables();

describe('Users', () => {
    it('should not login a user whose account is not registered', done => {
        chai.request(server)
        .post('/login/user')
        .send({
            username: 'MCFrank16',
            password: 'MCFrank16@123'
        })
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').equal('Username do not exist');
            done();
        })
    })

    it('should not re-register a user', done => {
        const user = {
            username: 'MCFrank18',
            password: 'MCFrank16@123'
        }
        chai.request(server)
        .post('/create/user')
        .send(user)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').equal(`Key (username)=${'(' + user.username + ')'} already exists.`);
            done();
        })
    })

    it('should login a user', done => {
        chai.request(server)
        .post('/login/user')
        .send({
            username: 'Yohani',
            password: 'Yohani@123'
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            done();
        })
    })
})