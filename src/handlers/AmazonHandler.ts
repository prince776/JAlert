import { Handler, Job } from "../types";
import axios from 'axios';

const resLimit = 100;
const url = `https://www.amazon.jobs/en/search.json?radius=24km&facets%5B%5D=normalized_country_code&facets%5B%5D=normalized_state_name&facets%5B%5D=normalized_city_name&facets%5B%5D=location&facets%5B%5D=business_category&facets%5B%5D=category&facets%5B%5D=schedule_type_id&facets%5B%5D=employee_class&facets%5B%5D=normalized_location&facets%5B%5D=job_function_id&facets%5B%5D=is_manager&facets%5B%5D=is_intern&offset=0&result_limit=${resLimit}&sort=relevant&latitude=&longitude=&loc_group_id=&loc_query=India&base_query=Software%20Development&city=&country=IND&region=&county=&query_options=&`;
const name = 'amazon';

const amazonHandler: Handler = {
    company: {
        name: name,
    },
    getJobs: async () => {
        const amazonAPIRes = await axios.get(url);
        const rawJobs: any[] = amazonAPIRes.data.jobs;

        // filters out jobs > a month 
        const jobs: any[] = rawJobs.filter( job => {
            return (Date.now()- Date.parse(job.posted_date)) / 1000 <= 2592000;
        } )

        const result: Job[] = jobs.map(job => {
            const urlPrefix = 'https://amazon.jobs'
            return {
                id: job.id,
                name: job.title,
                url: urlPrefix + job.job_path,
                jd: `${job.basic_qualifications}\n${job.preferred_qualifications}\n${job.description}`,
                location: 'india',
                companyName: name,    
            };
        })

        return result;
    }
};

export = amazonHandler;
