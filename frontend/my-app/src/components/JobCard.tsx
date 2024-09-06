import React, { useState } from 'react';
import JoblyApi from "../../../../api";
import { useUserContext } from '../hooks/useUserContext';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // Added state for error
    const { currentUser } = useUserContext();

    const handleApply = async () => {
        if (currentUser) {
            setLoading(true);
            try {
                // Fetch the user's applied jobs
                const appliedJobs = await JoblyApi.getAppliedJobs(currentUser.username);

                // Check if the job is already applied
                if (appliedJobs.includes(job.id)) {
                    setError("You have already applied for this job.");
                    setLoading(false);
                    return;
                }

                // Apply for the job
                await JoblyApi.applyToJob(currentUser.username, job.id);
                setApplied(true);
            } catch (err) {
                if (err instanceof Error) {
                    // Handle known errors
                    if (err.message.includes("duplicate key value")) {
                        setError("You have already applied for this job.");
                    } else {
                        setError("An error occurred while applying for the job.");
                    }
                } else {
                    // Handle unknown errors
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="job-card">
            <h3 style={{ textAlign: "center" }}>{job.title}</h3>
            <p>Salary: ${job.salary}</p>
            <p>Equity: {job.equity}</p>
            <button onClick={handleApply} disabled={applied || loading}>
                {applied ? "Applied" : "Apply"}
            </button>
            {error && <p className="error">{error}</p>} {"You have already applied for this job"}
        </div>
    );
};

export default JobCard;
