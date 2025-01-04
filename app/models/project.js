import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  bgImage: String,
  link: String,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
