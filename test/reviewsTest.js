const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../index'); // Your Express app
const Review = require('../models/review');

chai.should();
chai.use(chaiHttp);

describe("Reviews API GET Endpoints", () => {
    let dummyMovieId = new mongoose.Types.ObjectId();
    let dummyUserId = new mongoose.Types.ObjectId();
    

  // Clear reviews collection and seed test reviews before tests run.
  before(async () => {
    await Review.deleteMany({});
    await Review.create([
      { movieId: dummyMovieId, userId: dummyUserId, reviewText: "Great movie!", rating: 8 },
      { movieId: dummyMovieId, userId: dummyUserId, reviewText: "Not bad", rating: 6 }
    ]);
  });

  describe("GET /reviews", () => {
    it("should get all reviews", (done) => {
      chai.request(app)
        .get("/reviews")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe("GET /reviews/:id", () => {
    it("should get a single review by the given id", async () => {
      const review = await Review.findOne({ reviewText: "Great movie!" });
      return chai.request(app)
        .get(`/reviews/${review._id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("reviewText").eql("Great movie!");
        });
    });

    it("should return 404 if the review is not found", (done) => {
      const fakeId = "615c1c1c1c1c1c1c1c1c1c1c";
      chai.request(app)
        .get(`/reviews/${fakeId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
