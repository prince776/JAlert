import { Handler, Job } from "../types"

const axios = require('axios');

const data = JSON.stringify({
    "lang": "en_us",
    "deviceType": "desktop",
    "country": "us",
    "pageName": "Engineering",
    "ddoKey": "refineSearch",
    "sortBy": "Most recent",
    "subsearch": "",
    "from": 0,
    "jobs": true,
    "counts": true,
    "all_fields": [
      "worksite",
      "country",
      "state",
      "city",
      "category",
      "subCategory",
      "employmentType",
      "educationLevel"
    ],
    "pageType": "category",
    "size": 20,
    "clearAll": false,
    "jdsource": "facets",
    "isSliderEnable": false,
    "pageId": "page882",
    "siteType": "students",
    "isMostPopular": true,
    "keywords": "",
    "global": true,
    "selected_fields": {
      "category": [
        "Engineering"
      ],
      "educationLevel": [
        "Bachelors"
      ],
      "subCategory": [
        "Software Engineering",
        "Data & Applied Sciences"
      ]
    },
    "sort": {
      "order": "desc",
      "field": "postedDate"
    }
});

// these are absolutely essential params, without these the request returns failure
const config = {
    method: 'post',
    url: 'https://careers.microsoft.com/students/widgets',
    headers: { 
      'Cookie': 'MUID=151C0AD9D748658024561B19D68464B2; MC1=GUID=a25a680b927b4b00b7fb1c535fc9ea10&HASH=a25a&LV=202208&V=4&LU=1660994083469; mbox=PC#2ba4e4b99b8044059031a9018ad5452f.31_0#1699709033|session#5fc85df8dca9408e9aae03d4101aad93#1665524195; JSESSIONID=d7bbc2aa-aa7e-4fdf-a663-314b742f65bc; PLAY_SESSION=adc0e5503a47bcaf279cdee73ca73b3098c96886-JSESSIONID=d7bbc2aa-aa7e-4fdf-a663-314b742f65bc; VISITED_LANG=en; VISITED_COUNTRY=us; VISITED_VARIANT=students; PHPPPE_GCC=a; JSESSIONID=d7bbc2aa-aa7e-4fdf-a663-314b742f65bc; PLAY_SESSION=dbf93802ec1c76cfd37a1f1a1c8abcf79dd5cb08-JSESSIONID=f7a838e8-f58c-4f05-b847-a455f6713c99', 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36', 
      'content-type': 'application/json', 
      'x-csrf-token': 'a0e3bff4982d4280ba2e9d79391c9ccb'
    },
    data : data
};

const NAME = 'microsoft';

const microsoftHandler: Handler = {
    company: {
        name: NAME,
    },
    getJobs: async () => {
        const msftAPIRes = await axios(config);
        const result: Job[] = [];
        msftAPIRes.data.refineSearch.data.jobs.map((job:any) => {
            result.push({
                id: job.jobSeqNo,
                name: job.title,
                url: `https://careers.microsoft.com/students/us/en/job/${job.jobSeqNo}/`,
                companyName: job.companyName,
                jd: job.description,
                location: job.country,
            });
        })
        return result;
    }
}

export = microsoftHandler