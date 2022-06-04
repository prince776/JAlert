import { Job } from './types';

export function createMessage(job: Job) {
    return `New Job opening at ${job.companyName}: ${job.name}.
JobID: ${job.id}, Location: ${job.location}
Apply Here: ${job.url}\n\n`;
}
