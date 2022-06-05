import { Handler, Job } from "../types";
import axios from 'axios';
import cheerio from 'cheerio';

const baseUrl = 'https://sharechat.hire.trakstar.com';
const url = `${baseUrl}/?country=India&team_id=25506&team_id=25508&q=&limit=25`;

const NAME = 'sharechat';

const sharechatHandler: Handler = {
    company: {
        name: NAME,
    },
    getJobs: async () => {
        const htmlRes = await axios.get(url);
        const $ = cheerio.load(htmlRes.data); // Load the HTML string into cheerio

        const result: Job[] = [];

        $('.js-openings-list > .list-item').each((idx, element) => {
            let url = `${baseUrl}${$(element).find('a').attr('href')?.trim()}`;
            if (url.endsWith('/')) {
                url = url.slice(0, -1);
            }
            const jobID = url.split('/').at(-1);
            if (!jobID) {
                return;
            }
            const name = $(element).find('.js-job-list-opening-name').text().trim();

            result.push({
                id: jobID,
                name: name,
                url: url,
                companyName: NAME,
                jd: '',
                location: 'india',
            });
        });
        return result;
    }
};

export = sharechatHandler;
