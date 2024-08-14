import { Company } from './CompanyList';
import './CompanyCard.css';
import { useNavigate } from 'react-router-dom';

interface CompanyCardProps {
    company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/companies/${company.handle}`);
    };

    return (
        <div className="company-card" onClick={handleClick}>
            {/* <img src={company.logo_url} alt={company.name} /> */}
            <h2>{company.name}</h2>
            <p>{company.description}</p>
        </div>
    );
};

export default CompanyCard;
