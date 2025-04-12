// test/moviesTest.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // This should import your Express app
const Movie = require('../models/movie');

chai.should();
chai.use(chaiHttp);

describe('Movies API GET Endpoints', () => {

  // Before running tests, optionally clear and seed the test database if needed
  before(async () => {
    // Clear movies collection for a consistent testing environment
    await Movie.deleteMany({});
    
    // Seed the database with a few movies for testing
    await Movie.create([
      {
        title: "Test Movie 1",
        director: "Director 1",
        releaseDate: new Date("2020-01-01"),
        genre: "Action",
        duration: 120
      },
      {
        title: "Test Movie 2",
        director: "Director 2",
        releaseDate: new Date("2021-01-01"),
        genre: "Comedy",
        duration: 90
      }
    ]);
  });

  // Test for GET all movies
  describe("GET /movies", () => {
    it("should get all movies", (done) => {
      chai.request(app)
        .get("/movies")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  // Test for GET movie by ID
  describe("GET /movies/:id", () => {
    it("should get a single movie by the given id", async () => {
      // First, retrieve a movie from the database
      const movie = await Movie.findOne({ title: "Test Movie 1" });
      return chai.request(app)
        .get("/movies/" + movie._id)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql("Test Movie 1");
        });
    });

    it("should return 404 if movie is not found", (done) => {
      const fakeId = "615c1c1c1c1c1c1c1c1c1c1c"; // An example of a valid format ID but likely nonexistent in your DB
      chai.request(app)
        .get("/movies/" + fakeId)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
