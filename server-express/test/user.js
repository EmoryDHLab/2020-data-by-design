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
        name: 'Test User',
        password: "testpassword",
    }
    let user2 = {
        email: "testusername2@gmail.com",
        name: 'Test User2',
        password: "testpassword2",
        notebook: [{badNotebookField: 1, anotherBadNotebookField: 2}]
    }
    let user3 = {
      email: "testusername3@gmail.com",
      name: 'Test User3',
      password: "testPassword3",
      notebook: [{type: 0, notebookId: 0, html: "testhtml", metadata: "testmetadata"}]
    }

    let token;
    describe('User creation endpoint (POST /api/users/)', function () {
      let responseUser;
        it('fails to create a user without a name', function (done) {
          chai.request(app)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send({user: {email: user.email, password: user.password}})
            .end((err, res) => {
              expect(res).to.have.status(422);
              console.log(res.body.errors.name);
              expect(res.body.errors).to.have.property('name');
              done();
            })
        });
        it('creates a user based on the provided email, name, and password', function (done) {
            chai.request(app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .send({ user: user})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('user');
                    expect(res.body.user).to.have.property('email').that.equals(user.email);
                    expect(res.body.user).to.have.property('token');
                    responseUser = res.body.user;
                    token = res.body.user.token;
                    done();
                });
        });
        it ('creates that user with an empty notebook as no notebook field was specified', function (done) {
            expect(responseUser).to.have.property('notebook');
            expect(responseUser.notebook).to.be.an('array').that.has.length(0);
            done();
        });
        it ('creates a user with notebook field if notebook was specified', function (done) {
            chai.request(app)
              .post('/api/users')
              .set('Content-Type', 'application/json')
              .send({ user: user3})
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.have.property('notebook');
                done();
              });
        })
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
        });
        it('does not allow the creation of a user with a bad notebook', function (done) {
            chai.request(app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .send({ user: user2})
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });
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
                    expect(res.body.user).to.have.property('email');
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
    });
    describe ('Current user notebook endpoint (GET and POST /api/users/current/notebook', function() {
        it('Allows POST when given a valid token and valid notebook', function(done) {
            chai.request(app)
                .post('/api/users/current/notebook')
                .set('Authorization', 'Token ' + token)
                .set('Content-Type', 'application/json')
                .send({notebook: [{html: "html1", metadata: "metadata1", notebookId: 1, type: 1}, {html: "html2", metadata: "metadata2", notebookId: 2, type:1}] })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('notebook')
                    expect(res.body.notebook).to.be.an('array').that.has.length(2);
                    done();
                });
      });
      it('Does not allow POST with an invalid notebook', function(done) {
        chai.request(app)
            .post('/api/users/current/notebook')
            .set('Authorization', 'Token ' + token)
            .set('Content-Type', 'application/json')
            .send({notebook: [{html: "html1", metadata: "metadata1", notebookId: 1}, {html: "html2", metadata: "metadata2", notebookId: 2}] })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.have.property('errors');
                done();
            });
      });
      it('Allows GET when given a valid token', function(done) {
            chai.request(app)
                .get('/api/users/current/notebook')
                .set('Authorization', 'Token ' + token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.notebook).to.be.an('array').that.has.length(2);
                    done();
                });
      });
    });
});
User.deleteMany({}, (err) => {});
