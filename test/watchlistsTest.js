const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../index'); // Your Express app
const Watchlist = require('../models/watchlist');

chai.should();
chai.use(chaiHttp);

describe("Watchlists API GET Endpoints", () => {
  let dummyUserId = new mongoose.Types.ObjectId();

  // Clear watchlists collection and seed test watchlists before tests run.
  before(async () => {
    await Watchlist.deleteMany({});
    await Watchlist.create([
      { userId: dummyUserId, name: "Favorites", movies: [] },
      { userId: dummyUserId, name: "Watch Later", movies: [] }
    ]);
  });

  describe("GET /watchlists", () => {
    it("should get all watchlists", (done) => {
      chai.request(app)
        .get("/watchlists")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe("GET /watchlists/:id", () => {
    it("should get a single watchlist by the given id", async () => {
      const watchlist = await Watchlist.findOne({ name: "Favorites" });
      return chai.request(app)
        .get(`/watchlists/${watchlist._id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eql("Favorites");
        });
    });

    it("should return 404 if the watchlist is not found", (done) => {
      const fakeId = "615c1c1c1c1c1c1c1c1c1c1c";
      chai.request(app)
        .get(`/watchlists/${fakeId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
