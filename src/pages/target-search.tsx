import React, { useState, useEffect } from 'react';
import GroupTable from '../components/group-table';
import { Group } from '../data/group';
import { searchGroupByTargetIndustry, searchGroupByTargetCountry } from '../services/group';
import { getCountryList, getIndustryList } from '../services/target';

const SearchPage: React.FC = () => {
  const [industryList, setIndustries] = useState<string[]>([]);
  const [countryList, setCountries] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [results, setResults] = useState<Group[]>([]);
  const [searchType, setSearchType] = useState<string>('industry');

  useEffect(() => {
    fetchIndustryList();
    fetchCountryList();
  }, []);

  const fetchIndustryList = async () => {
    try {
      const response = await getIndustryList();
      setIndustries(response.map((industry) => industry.name));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountryList = async () => {
    try {
      const response = await getCountryList();
      setCountries(response.map((country) => country.name));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndustry && searchType === 'industry') {
      const response = await searchGroupByTargetIndustry(selectedIndustry);
      setResults(response);
    } else if (selectedCountry && searchType === 'country') {
      const response = await searchGroupByTargetCountry(selectedCountry);
      setResults(response);
    }
  };

  const handleToggleChange = () => {
    setSelectedIndustry('');
    setSelectedCountry('');
  };

  return (
    <div>
      <h1>Search APT Groups</h1>
      <div className="toggle-group">
        <label htmlFor="industry-toggle">Industry</label>
        <input
          type="radio"
          id="industry-toggle"
          name="search-toggle"
          value="industry"
          checked={searchType === 'industry'}
          onChange={() => {
            setSearchType('industry');
            handleToggleChange();
          }}
        />
        <label htmlFor="country-toggle">Country</label>
        <input
          type="radio"
          id="country-toggle"
          name="search-toggle"
          value="country"
          checked={searchType === 'country'}
          onChange={() => {
            setSearchType('country');
            handleToggleChange();
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {searchType === 'industry' ? (
          <div className="input-group">
            <select
              id="industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">Select an industry</option>
              {industryList.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="input-group">
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select a country</option>
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && <GroupTable groupList={results} />}
    </div>
  );
};

export default SearchPage;