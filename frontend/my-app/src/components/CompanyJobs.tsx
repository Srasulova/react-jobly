import JobCard from './JobCard';

interface Job {
    id: number;
    title: string;
    salary: number;
    equity: string;
}

interface CompanyJobsProps {
    jobs: Job[];
}

const CompanyJobs: React.FC<CompanyJobsProps> = ({ jobs }) => {
    return (
        <div className="job-list">
            {jobs.length ? (
                jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))
            ) : (
                <p>No jobs available</p>
            )}
        </div>
    );
};

export default CompanyJobs;

