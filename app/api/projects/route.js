const dbConnect = require('../../lib/mongodb');  // Correct path to mongodb.js
const Project = require('../../models/project');  // Correct path to project.js

export async function GET(request) {
  try {
    await dbConnect();
    const projects = await Project.find({});
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await dbConnect();
    const project = new Project(data);
    await project.save();
    return new Response(JSON.stringify(project), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error }), {
      status: 500,
    });
  }
}
