import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Group from '../data/group';

import { API_URL } from '../config/default';

interface Industry {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

const SearchPage: React.FC = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [results, setResults] = useState<Group[]>([]);
  const [isIndustrySelected, setIsIndustrySelected] = useState<boolean>(true);
  const [searchType, setSearchType] = useState<string>('industry');


  useEffect(() => {
    fetchIndustries();
    fetchCountries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/industry/list`);
      setIndustries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/country/list`);
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndustry && isIndustrySelected) {
      const response = await axios.get<Group[]>(`${API_URL}/api/group/target-industry/search/${selectedIndustry}`);
      setResults(response.data);
    } else if (selectedCountry && !isIndustrySelected) {
      const response = await axios.get<Group[]>(`${API_URL}/api/group/target-country/search/${selectedCountry}`);
      setResults(response.data);
    }
  };

  const handleToggleChange = () => {
    setIsIndustrySelected(!isIndustrySelected);
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
              {industries.map((industry) => (
                <option key={industry.id} value={industry.name}>
                  {industry.name}
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
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>MITRE ID</th>
              <th>Associated Groups</th>
              <th>Aliases</th>
              <th>Location</th>
              <th>Sponsor</th>
              <th>Motivation</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {results.map((group) => (
              <tr key={group.id}>
                <td>
                  <Link to={`/groups?${group.id}`}>{group.id}</Link>
                </td>
                <td>{group.name}</td>
                <td>{group.mitre_id}</td>
                <td>{group.associated_groups}</td>
                <td>{group.aliases}</td>
                <td>{group.location}</td>
                <td>{group.sponsor}</td>
                <td>{group.motivation}</td>
                <td>{group.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchPage;
