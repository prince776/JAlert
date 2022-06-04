export interface Job {
    id: string,
    name: string,
    url: string,
    jd: string,
    location: string,
    companyName: string,
};

export interface Company {
    name: string;
}

export interface Handler {
    company: Company;
    getJobs: () => Promise<Job[]>;
};
