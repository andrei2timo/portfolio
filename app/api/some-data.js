// In your "app/api/some-data.js"
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const uri = process.env.MONGODB_URI;

let cachedClient = null;

const connectToDatabase = async () => {
  if (cachedClient) {
    console.log('Using cached database connection.');
    return cachedClient;
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log('Connected to MongoDB!');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

// Define your serverless function
module.exports = async (req, res) => {
  // Enable CORS
  cors()(req, res, async () => {
    // Handle GET request
    if (req.method === 'GET') {
      try {
        const client = await connectToDatabase();
        const collection = client.db('projectDB').collection('projects');
        const data = await collection.find({}).toArray();
        console.log('Fetched data from MongoDB:', data);

        if (data.length === 0) {
          return res.status(404).json({ message: 'No data found' });
        }
        res.status(200).json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error retrieving data' });
      }
    } else {
      // Method Not Allowed
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
};
