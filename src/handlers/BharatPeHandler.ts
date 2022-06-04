import { Handler, Job } from "../types";
import axios from 'axios';

const urls = [
    'https://bharatpe.darwinbox.in/ms/candidateapi/job?department=60523c195ff6d&location=6062b6a6c6f87,6062b6a715137,6062b6a71b6ef,6062b6a731915,a6166c4074f2c2,is_remote&exp=0&page=1&limit=10',
    'https://bharatpe.darwinbox.in/ms/candidateapi/job?department=60523c195ff6d&location=6062b6a6c6f87,6062b6a715137,6062b6a71b6ef,6062b6a731915,a6166c4074f2c2,is_remote&exp=1&page=1&limit=10',
    'https://bharatpe.darwinbox.in/ms/candidateapi/job?department=60649b2268c53&location=6062b6a6c6f87,6062b6a715137,6062b6a71b6ef,6062b6a731915,a6166c4074f2c2,is_remote&exp=0&page=1&limit=10',
    'https://bharatpe.darwinbox.in/ms/candidateapi/job?department=60649b2268c53&location=6062b6a6c6f87,6062b6a715137,6062b6a71b6ef,6062b6a731915,a6166c4074f2c2,is_remote&exp=1&page=1&limit=10',
];

const name = 'bharatpe';

const bharatPeHandler: Handler = {
    company: {
        name: name,
    },
    getJobs: async () => {
        let result: Job[] = [];

        for (const url of urls) {

            const apiRes = await axios.get(url);
            const jobs: any[] = apiRes.data.message.jobs || [];
            const currResult: Job[] = jobs.map(job => {
                return {
                    id: job.id,
                    name: job.title,
                    url: `https://bharatpe.darwinbox.in/ms/candidate/careers/${job.id}`,
                    jd: `${job.title}`,
                    location: 'india',
                    companyName: name,
                };
            })

            result = [...result, ...currResult];
        }
        return result;
    }
};

export = bharatPeHandler;
