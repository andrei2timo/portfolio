const dotenv = require('dotenv');
dotenv.config(); // Use default .env file

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development
    'https://portfolio-navy-delta-66.vercel.app', // Vercel domain 1
    'https://portfolio-git-master-andrei2timos-projects.vercel.app', // Vercel domain 2
    'https://portfolio-p87vb4act-andrei2timos-projects.vercel.app', // Vercel domain 3
  ]
}));

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

connectToDatabase();

app.get('/api/some-data', async (req, res) => {
  try {
    const collection = client.db("projectDB").collection("projects");
    const data = await collection.find({}).toArray();
    console.log("Fetched data from MongoDB:", data); 
    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error retrieving data" });
  }
});

// For Vercel to work, you can use the `vercel.json` file
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
