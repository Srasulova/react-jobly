import React from 'react';
import { Company } from './CompanyList';

interface CompanyCardProps {
    company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    return (
        <div className="company-card">
            <img src={company.logo_url} alt={company.name} />
            <h2>{company.name}</h2>
            <p>{company.description}</p>
        </div>
    );
};

export default CompanyCard;
