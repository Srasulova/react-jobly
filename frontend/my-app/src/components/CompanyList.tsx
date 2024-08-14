import { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from "../../../../api";
import SearchInput from './SearchInput';
import './CompanyList.css';

export interface Company {
    handle: string;
    name: string;
    description: string;
    logo_url: string;
}

function CompanyList() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false); // Add a loading state

    useEffect(() => {
        async function fetchCompanies() {
            setLoading(true); // Start loading
            try {
                let companies;
                if (search.trim()) {
                    companies = await JoblyApi.getCompanies({ name: search });
                } else {
                    companies = await JoblyApi.getCompanies(); // Fetch all companies if no search term
                }
                setCompanies(companies);
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setLoading(false); // End loading
            }
        }
        fetchCompanies();
    }, [search]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    return (
        <div className="company-list-container">
            <h1>Companies</h1>
            <SearchInput
                search={search}
                onSearchChange={handleSearchChange}
                placeholder="Search companies..."
            />
            {loading ? ( // Display loading message if loading state is true
                <p>Loading companies...</p>
            ) : (
                <div className="company-list">
                    {companies.map((company) => (
                        <CompanyCard key={company.handle} company={company} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CompanyList;
