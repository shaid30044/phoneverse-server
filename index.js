require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://phoneverse-3d299.web.app",
      "https://phoneverse-3d299.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2mr4msx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const phoneCollection = client.db("phoneDB").collection("phones");

    const blogCollection = client.db("phoneDB").collection("blogs");
    const userCollection = client.db("phoneDB").collection("users");

    //   blog api

    app.get("/blogs", async (req, res) => {
      const cursor = blogCollection.find();
      const result = await cursor.toArray();

      res.send(result);
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);

      res.send(result);
    });

    console.log("Pinged your deployment.");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Phone Verse Server is running");
});

app.listen(port, () => {
  console.log(`Phone Verse Server is running on Port ${port}`);
});
