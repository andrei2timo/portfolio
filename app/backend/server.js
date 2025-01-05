const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

const uri = "mongodb+srv://andreitimo19:MInTPKFi9Og7SChN@dj-portfolio.etqs8.mongodb.net/?retryWrites=true&w=majority&appName=Dj-portfolio";
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
  origin: 'http://localhost:3000' // Allow your React app's port
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
