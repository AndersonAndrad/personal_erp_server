import { Project } from '@app/core/interfaces/project.interface';
import mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema<Project>({
  name: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  hoursPrice: { type: Number, default: 0 },
});

export const ProjectModel: mongoose.Model<Project> = mongoose.model('projects', ProjectSchema);
