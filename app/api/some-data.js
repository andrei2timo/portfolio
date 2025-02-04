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
  origin: [
    'http://localhost:3000', // For local development
    'http://localhost:3001', // For local development
    'http://localhost:3002', // <-- Make sure this is added for your frontend
    'portfolio-navy-delta-66.vercel.app', // For deployment
    'https://portfolio-git-master-andrei2timos-projects.vercel.app',
    'https://portfolio-qv2yw7py0-andrei2timos-projects.vercel.app',
  ]
}));

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    console.log("Using cached database connection.");
    return cachedClient;
  }

  try {
    // Try connecting to MongoDB
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    console.log("Connected to MongoDB!");

    // Cache the client for reuse
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}


// Call the function to connect
connectToDatabase();

// Route to fetch data from the `projects` collection in the `projectDB` database
app.get('/api/some-data', async (req, res) => {
  console.log('API endpoint hit');
  try {
    const client = await connectToDatabase(); // Get client from cached connection
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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});