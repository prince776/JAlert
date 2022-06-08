import { Handler, Job } from "../types";
import axios from 'axios';

const url = 'https://www.amazon.jobs/en/search.json?radius=24km&facets%5B%5D=normalized_country_code&facets%5B%5D=normalized_state_name&facets%5B%5D=normalized_city_name&facets%5B%5D=location&facets%5B%5D=business_category&facets%5B%5D=category&facets%5B%5D=schedule_type_id&facets%5B%5D=employee_class&facets%5B%5D=normalized_location&facets%5B%5D=job_function_id&facets%5B%5D=is_manager&facets%5B%5D=is_intern&offset=0&result_limit=10&sort=relevant&latitude=&longitude=&loc_group_id=&loc_query=India&base_query=Software%20Development&city=&country=IND&region=&county=&query_options=&';
const name = 'amazon';

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
