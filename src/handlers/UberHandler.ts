import { Handler, Job } from "../types";
import axios from 'axios';

const NAME = 'uber';

const url = 'https://www.uber.com/api/loadSearchJobsResults?localeCode=en';
const headers = {
    cookie: '_ua={"session_time_ms":1654529981857}; uber_sites_geolocalization={%22best%22:{%22localeCode%22:%22en%22%2C%22countryCode%22:%22US%22%2C%22territoryId%22:197%2C%22territorySlug%22:%22new-delhi%22%2C%22territoryName%22:%22Delhi%20NCR%22}%2C%22url%22:{%22localeCode%22:%22en%22%2C%22countryCode%22:%22US%22}%2C%22user%22:{%22countryCode%22:%22IN%22%2C%22territoryId%22:197%2C%22territoryGeoJson%22:[[{%22lat%22:30.1809616%2C%22lng%22:74.4652634}%2C{%22lat%22:30.1809616%2C%22lng%22:78.9299011}%2C{%22lat%22:27.4699402%2C%22lng%22:78.9299011}%2C{%22lat%22:27.4699402%2C%22lng%22:74.4652634}]]%2C%22territoryGeoPoint%22:{%22latitude%22:28.6329%2C%22longitude%22:77.2196}%2C%22territorySlug%22:%22new-delhi%22%2C%22territoryName%22:%22Delhi%20NCR%22%2C%22localeCode%22:%22en%22}}; segmentCookie=a; utag_geo_code=US; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ1Mjk5ODMsImV4cCI6MTY1NDYxNjM4M30.hynUabTukY2O11G43SnmU1eC9oY8GGTV7OeMeEZ3uFM; UBER_CONSENTMGR=1654529998463|consent:true; CONSENTMGR=c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:1%7Cc6:1%7Cc7:1%7Cc8:1%7Cc9:1%7Cc10:1%7Cc11:1%7Cc12:1%7Cc13:1%7Cc14:1%7Cc15:1%7Cts:1654529998463%7Cconsent:true; _janalytics_ses.d83c=*; _janalytics_id.d83c=98f87f80-4641-4892-bc2d-7c7165103480.1654530000.1.1654530025.1654530000.eb2c09a9-13a5-4b19-9e52-750062f57e96; utag_main=v_id:018139abffcb005e119debaadb7805079002307100ac8$_sn:1$_ss:0$_st:1654531910361$ses_id:1654529982411%3Bexp-session$_pn:5%3Bexp-session$segment:a$optimizely_segment:a',
    'x-csrf-token': 'x',
    'content-type': 'application/json',
};
const reqBody = { "params": { "location": [{ "country": "IND", "region": "Karnataka", "city": "Bangalore" }, { "country": "IND", "region": "Telangana", "city": "Hyderabad" }, { "country": "IND", "region": "Karnataka", "city": "Bengaluru" }, { "country": "IND", "city": "Remote" }], "department": ["Engineering"] }, "page": 0, "limit": 1000 }

const uberHandler: Handler = {
    company: {
        name: NAME,
    },
    getJobs: async () => {
        const apiRes = await axios({
            url: url,
            data: reqBody,
            headers: headers,
            method: 'POST',
        }).catch(err => err.response)
        const jobs: any[] = apiRes.data.data?.results || [];
        let result: Job[] = jobs.map(job => {
            return {
                id: String(job.id),
                name: job.title,
                url: `https://www.uber.com/global/en/careers/list/${job.id}`,
                jd: '',
                location: `${job.location.city}, ${job.location.countryName}`,
                companyName: NAME,
            };
        });

        return result;
    }
};

export = uberHandler;
