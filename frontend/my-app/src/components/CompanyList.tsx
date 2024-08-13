import { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from '../api';

export interface Company {
    handle: string;
    name: string;
    description: string;
    logo_url: string

}

function CompanyList() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        async function fetchCompanies() {
            const res = await JoblyApi.getCompanies({ search });
            setCompanies(res);
        }
        fetchCompanies();
    }, [search]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1>Companies</h1>
            <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={handleSearchChange}
            />
            <div className="company-list">
                {companies.map((company) => (
                    <CompanyCard key={company.handle} company={company} />
                ))}
            </div>
        </div>
    );
}

export default CompanyList;
