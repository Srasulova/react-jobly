import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from "../../../../api"
import CompanyJobs from './CompanyJobs'; // Updated import

export interface Job {
    id: number;
    title: string;
    salary: number;
    equity: string;
}

export interface CompanyDetailProps {
    handle: string;
    name: string;
    description: string;
    jobs: Job[];
}

const CompanyDetail: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const [company, setCompany] = useState<CompanyDetailProps | null>(null);

    useEffect(() => {
        if (handle) {
            async function fetchCompany() {
                try {
                    const companyData = await JoblyApi.getCompany(handle);
                    setCompany({
                        ...companyData,
                        jobs: companyData.jobs || [],
                    });
                } catch (err) {
                    console.error("API Error:", err);
                }
            }
            fetchCompany();
        }
    }, [handle]);

    if (!company) {
        return <p>Loading company details...</p>;
    }

    return (
        <div className="company-detail">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <CompanyJobs jobs={company.jobs || []} /> {/* Updated to CompanyJobs */}
        </div>
    );
};

export default CompanyDetail;
