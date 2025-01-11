// app/api/some-data.js

import { MongoClient, ServerApiVersion } from 'mongodb';

// Connect to MongoDB using the URI from the environment variable
const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

// Initialize MongoDB client
if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the MongoClient instance
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

// Define the serverless function to fetch data from MongoDB
export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const collection = client.db('projectDB').collection('projects');
    const data = await collection.find({}).toArray();

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
}
