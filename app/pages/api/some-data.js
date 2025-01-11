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
  if (cachedClient) return cachedClient;

  try {
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    throw new Error('Failed to connect to MongoDB: ' + error.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const client = await connectToDatabase();
    const collection = client.db('projectDB').collection('projects');
    const data = await collection.find({}).toArray();

    if (!data.length) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data: ' + error.message });
  }
}
