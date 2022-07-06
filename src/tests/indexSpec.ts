import app from "../index";
import supertest from "supertest";
import assert from "assert";

describe("Test Image Processing API", () => {
  describe("site health check", () => {
    it("Homepage accessible", () => {
      return supertest(app).get("/api").expect(200);
    });
  });
  describe("Test for parameters", () => {
    it("Accepts all mandatory parameters", () => {
      return supertest(app)
        .get(
          "/api/v1/images?" +
            ["filename=encenadaport.jpg", "height=600", "width=800"].join("&")
        )
        .expect(200);
    });
    it("Rejects duplicate parameters", () => {
      return supertest(app)
        .get(
          "/api/v1/images?" +
            [
              "filename=encenadaport.jpg",
              "height=600",
              "width=800",
              "width=1200",
            ].join("&")
        )
        .expect(400);
    });
  });

  describe("Test for file conversion", () => {
    it("Return thumbnail image", () => {
      return supertest(app)
        .get(
          "/api/v1/images?" +
            ["filename=encenadaport.jpg", "height=600", "width=800"].join("&")
        )
        .expect(200)
        .then((response) => {
          assert(
            response.text ===
              `<img src="/images/thumbs/encenadaport-800-600.jpg"/>`,
            "Expected thumbnail not created"
          );
        });
    });

    it("Return error on non-existent image", () => {
      return supertest(app)
        .get(
          "/api/v1/images?" +
            ["filename=non-existent.jpg", "height=600", "width=800"].join("&")
        )
        .expect(400)
        .then((res) => {
          assert(
            res.text === "Error: file non-existent.jpg doesn't exist",
            "Response not as expected"
          );
        })
        .catch((err) => {});
    });
  });
});
