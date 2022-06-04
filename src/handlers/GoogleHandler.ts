import { Handler, Job } from "../types";
import axios from 'axios';

const url = 'https://careers.google.com/api/v3/search/?degree=BACHELORS&degree=MASTERS&distance=50&hl=en_US&jex=ENTRY_LEVEL&jlo=en_US&location=India&q=Software%20Engineer';
const name = 'google';

const googleHandler: Handler = {
    company: {
        name: name,
    },
    getJobs: async () => {
        const googleAPIRes = await axios.get(url);
        const jobs: any[] = googleAPIRes.data.jobs;
        const result: Job[] = jobs.map(job => {
            return {
                id: job.id,
                name: job.title,
                url: job.apply_url,
                jd: `${job.responsibilities}\n${job.qualifications}\n${job.description}`,
                location: 'india',
                companyName: name,
            };
        })

        return result;
    }
};

export = googleHandler;
