const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Your Express app
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);

describe("Users API GET Endpoints", () => {
  // Clear collection and seed test users before tests run.
  before(async () => {
    await User.deleteMany({});
    await User.create([
      { username: "testuser1", email: "test1@example.com", passwordHash: "password1" },
      { username: "testuser2", email: "test2@example.com", passwordHash: "password2" }
    ]);
  });

  describe("GET /users", () => {
    it("should get all users without password hashes", (done) => {
      chai.request(app)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          res.body.forEach(user => {
            user.should.not.have.property("passwordHash");
          });
          done();
        });
    });
  });

  describe("GET /users/:id", () => {
    it("should get a single user by the given id", async () => {
      const user = await User.findOne({ username: "testuser1" });
      return chai.request(app)
        .get(`/users/${user._id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("username").eql("testuser1");
          res.body.should.not.have.property("passwordHash");
        });
    });

    it("should return 404 if the user is not found", (done) => {
      // Use a valid but nonexistent ID
      const fakeId = "615c1c1c1c1c1c1c1c1c1c1c";
      chai.request(app)
        .get(`/users/${fakeId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
