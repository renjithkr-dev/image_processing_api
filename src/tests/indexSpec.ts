import express, { request, response, text } from "express";
import supertest from "supertest";
import assert from "assert";

const app = express();

describe("Test Image Processing API", () => {
  describe("Test for parameters", () => {
    const inputFileName = "encenadaport.jpg";
    it("Accept all mandatory parameters", (done) => {
      return supertest(app)
        .get(
          "/api/v1/images?" +
            ["filename=", inputFileName, "height=699", "width=800"].join("&")
        )
        .expect(200)
        .then((response) => {
          assert(response, `<img src="/images/thumbs/fjord-800-600.jpg"/>`);
          done();
        })
        .catch((err) => done);
    });
  });
});
