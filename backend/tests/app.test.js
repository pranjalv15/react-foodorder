const app = require("../app");
const request = require("supertest");

describe("test case for get meal and post order", () => {
  it("should return all meals", async () => {
    const res = await request(app).get("/meals");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should respond with 201 statuscode", async () => {
    const dummyOrder = {
      order: {
        items: [
          {
            id: "m2",
            name: "Margherita Pizza",
            price: "12.99",
            description:
              "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.",
            image: "images/margherita-pizza.jpg",
            quantity: 2,
          },
        ],
        customer: {
          name: "Pranjalvyas",
          email: "vyaspranjal@gmail.com",
          street: "akjsbdba",
          "postal-code": "560066",
          city: "Jaipur",
        },
      },
    };
    const response = await request(app).post("/orders").send(dummyOrder);
    console.log(response._body.message);
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response._body.message).toBe("Order created!");
  });

  it("should respond with 400 statuscode when order items is missing", async () => {
    const dummyOrder = {
      order: {
        items: [],
        customer: {
          name: "Pranjalvyas",
          email: "vyaspranjal@gmail.com",
          street: "akjsbdba",
          "postal-code": "560066",
          city: "Jaipur",
        },
      },
    };
    const response = await request(app).post("/orders").send(dummyOrder);
    expect(response.statusCode).toBe(400);
  });
});
