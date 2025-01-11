import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    console.log('Using cached database connection');
    return cachedClient;
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();
    const collection = client.db('projectDB').collection('projects');
    const data = await collection.find({}).toArray();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data' });
  }
}
