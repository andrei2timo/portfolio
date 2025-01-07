const dotenv = require('dotenv');
dotenv.config({ path: '../../.env.local' }); // This should be the very first line

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors'); // Import cors



console.log('MONGODB_URI:', process.env.MONGODB_URI); // Log the value of MONGODB_URI


const app = express();
const port = 5000;

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
  origin: process.env.CORS_ORIGIN || '*' // Allow your React app's port
}));

async function connectToDatabase() {
  try {
    // Try connecting to MongoDB
    await client.connect();
    console.log("Connected to MongoDB!");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

// Call the function to connect
connectToDatabase();

// Route to fetch data from the `projects` collection in the `projectDB` database
app.get('/api/some-data', async (req, res) => {
  try {
    const collection = client.db("projectDB").collection("projects");
    const data = await collection.find({}).toArray();
    console.log("Fetched data from MongoDB:", data);  // Log data from MongoDB
    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error retrieving data" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});