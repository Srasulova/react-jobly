import React, { ChangeEvent } from 'react';

interface SearchInputProps {
    search: string;
    onSearchChange: (value: string) => void;
    placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, onSearchChange, placeholder }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={handleChange}
        />
    );
};

export default SearchInput;
