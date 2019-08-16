process.env.NODE_ENV = "test";

const User = require("../models/user");
const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("User", () => {
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });
});

describe("/GET User", () => {
  it("Should return list of user", done => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an("object");
        done();
      });
  });
});
