import { useState } from 'react';

interface Job {
    id: number;
    title: string;
    salary: number;
    equity: string;
}

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [applied, setApplied] = useState(false);

    const handleApply = () => {
        setApplied(true);
    };

    return (
        <div className="job-card">
            <h3>{job.title}</h3>
            <p>Salary: ${job.salary}</p>
            <p>Equity: {job.equity}</p>
            <button onClick={handleApply} disabled={applied}>
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    );
};

export default JobCard;
