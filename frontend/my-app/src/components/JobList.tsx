import { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JoblyApi from '../../../../api';
import SearchInput from './SearchInput';
import './JobList.css';


interface Job {
    id: number;
    title: string;
    salary: number;
    equity: string;
}

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState<string>(""); // State for search input
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchJobs() {
            setLoading(true); // Start loading
            try {
                let fetchedJobs;
                if (search.trim()) {
                    // Use search query to fetch jobs
                    fetchedJobs = await JoblyApi.getJobs({ title: search });
                } else {
                    // Fetch all jobs if no search term
                    fetchedJobs = await JoblyApi.getJobs();
                }
                setJobs(fetchedJobs);
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setLoading(false); // End loading
            }
        }

        fetchJobs();
    }, [search]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    if (loading) return <p>Loading jobs...</p>;

    return (
        <div className="job-list-container">
            <h1>Jobs</h1>
            <SearchInput
                search={search}
                onSearchChange={handleSearchChange}
                placeholder="Search jobs..."
            />
            <div className="job-list">
                {jobs.length ? (
                    jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <p>No jobs available</p>
                )}
            </div>
        </div>
    );
};

export default JobList;
