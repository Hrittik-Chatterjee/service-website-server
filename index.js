const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("simple node server running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7isjbqc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // const serviceCollection = client.db("doctorService").collection("services");
    // const reviewCollection = client.db("doctorService").collection("reviews");
    // const orderCollection = client.db("doctorService").collection("orders");
    const slots = client.db("doctorService").collection("slots");
    const bookings = client.db("doctorService").collection("bookings");

    app.get("/slots", async (req, res) => {
      const query = {};
      const options = await slots.find(query).toArray();
      res.send(options);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const result = await bookings.insertOne(booking);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const query = {};
      const options = await bookings.find(query).toArray();
      res.send(options);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`simple node server running ${port}`);
});
