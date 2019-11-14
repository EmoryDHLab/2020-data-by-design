process.env.NODE_ENV = 'test';

const User = require('../models/Users');
const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
User.deleteMany({}, (err) => {});    
describe("User api endpoint", function () {
    this.timeout(0)

    it("loads properly", done => {
        chai
            .request(app)
            .get("/api/users")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    let user = {
        email: "testusername@gmail.com",
        password: "testpassword"
    }
    let token;
    describe('User creation endpoint (POST /api/users/)', function () {
        it('creates a user based on the provided email and password', function (done) {

            chai.request(app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .send({ user: user})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('user');
                    console.log(res.body);
                    expect(res.body.user).to.have.property('email').that.equals(user.email);
                    expect(res.body.user).to.have.property('token');
                    token = res.body.user.token;
                    done();
                });
        });
        it ('does not allow the creation of a duplicate user', function(done) {
            chai.request(app)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send({user: user})
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.have.property('errors');
                done();
            })
        })
    });
    describe ('User login endpoint (POST /api/users/login)', function () {
        it('Retrieves a token based on an email that is in the system', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({ user: user})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('user');
                    console.log(res.body);
                    expect(res.body.user).to.have.property('email').that.equals(user.email);
                    expect(res.body.user).to.have.property('token');
                    token = res.body.user.token;
                    done();
                });
        })
        it('Does not allow the retrieval of a user that does not exist', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({user: {email: 'notexisting@gmail.com', password: 'thepassword'}})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('errors');
                    done();
                })
        })
        it('Does not allow the retrieval of a user when given the wrong password', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({user: {email: user.email, password: 'wrongpassword'}})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('errors');
                    done();
                })
        })
    })
    describe ('User profile endpoint (GET /api/users/current', function() {
        it('Allows access when given a valid token', function(done) {
            chai.request(app)
                .get('/api/users/current')
                .set('Authorization', 'Token ' + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
            });
        });
        it('Blocks access when given an invalid token', function(done) {
            chai.request(app)
                .get('/api/users/current')
                .set('Authorization', 'Token asdf' + token)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
            });
        });
        it('Blocks access when given no invalid token', function(done) {
            chai.request(app)
                .get('/api/users/current')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
            });
        });
    })
});
User.deleteMany({}, (err) => {}); 