import mongoose from 'mongoose';
import { Job } from '../types';

const jobSchema = new mongoose.Schema<Job>({
    id: String,
    name: String,
    url: String,
    jd: String,
    location: String,
    companyName: String,
});

const JobModel = mongoose.model<Job>('Job', jobSchema);

export = JobModel;
