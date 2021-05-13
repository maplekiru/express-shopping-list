const request = require("supertest");
const app = require("./app");
let db = require("./fakeDb");


let item1 = {
  name: "mouse",
  price: 50
};

let item2 = { name: "keyboard", price: 200 }

beforeEach(function () {
  db.items.push(item1);
});

afterEach(function () {
  db.items = []; // mutate in place instead
});

describe(" SUCCESS /items", function () {

  it(" GET /items", async function () {
    const resp = await request(app)
      .get('/items');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(
      [item1]
    );
  });

  it(" GET /items/:name", async function () {
    const resp = await request(app)
      .get('/items/mouse');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(
      item1
    );
  });

  it(" POST /items", async function () {
    const resp = await request(app)
      .post('/items')
      .send(item2);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      added: item2
    });
  });

  it(" PATCH /items", async function () {
    const resp = await request(app)
      .patch('/items/mouse')
      .send({ name: "mice", price: 150});
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      updated: { name: "mice", price: 150}
    });
  })

  it(" DELETE /items", async function () {
    const resp = await request(app)
      .delete('/items/mouse');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      message: "Deleted"
    });
  })

});

describe(" Errors /items", function () {

  it(" GET /items/:name", async function () {
    const resp = await request(app)
      .get('/items/mice');
    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual(
      item1
    );
  });

  it(" POST /items missing price", async function () {
    const resp = await request(app)
      .post('/items')
      .send({name: "oops1"});
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
        "error": {
          "message": "Please input both a name and a price",
          "status": 400
        }
      }
    );
  });

  // it(" PATCH /items", async function () {
  //   const resp = await request(app)
  //     .patch('/items/mouse')
  //     .send({ name: "mice", price: 150});
  //   expect(resp.statusCode).toEqual(200);
  //   expect(resp.body).toEqual({
  //     updated: { name: "mice", price: 150}
  //   });
  // })

  // it(" DELETE /items", async function () {
  //   const resp = await request(app)
  //     .delete('/items/mouse');
  //   expect(resp.statusCode).toEqual(200);
  //   expect(resp.body).toEqual({
  //     message: "Deleted"
  //   });
  // })

});
