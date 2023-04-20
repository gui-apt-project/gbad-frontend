import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Group, { Target, Technique, Operation, Source, Software, Tactic } from '../data/group';

import { API_URL } from '../config/default';

interface Props {
  groupId?: string;
}

const APTGroupPage: React.FC<Props> = ({ groupId }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (groupId) {
      fetchGroupById(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    if (selectedGroup) {
      document.title = selectedGroup.name;
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get<Group[]>(`${API_URL}/api/group/list`);
      setGroups(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGroupById = async (id: string) => {
    try {
      const response = await axios.get<Group[]>(`${API_URL}/api/group/search/id/${id}`);
      setSelectedGroup(response.data[0]); // get first element of response data array
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderTargets = (target: Target) => {
    const countries = target.countries.map((country) => country.name);
    const industries = target.industries.map((industry) => industry.name);
  
    return (
      <tr>
        <th>Countries</th>
        <td>{countries.join(', ')}</td>
        <th>Industries</th>
        <td>{industries.join(', ')}</td>
      </tr>
    );
  };
  
  function renderArrayToLine(inputArray: string[]) {
    if (inputArray && inputArray.length > 0) {
      return (
        <tr>
          <td>{inputArray.join(", ")}</td>
        </tr>
      );
    } else {
      return null;
    }
  }

  function renderArray(inputArray: string[]) {
    return inputArray.map((inputItem) => (
      <tr key={inputItem}>
        <td>{inputItem}</td>
      </tr>
    ));
  }

  const renderTactics = (tactics: Tactic[]) => {
    return (
      <tr>
        <td>{tactics.map((tactic) => tactic.name).join(', ')}</td>
      </tr>
    );
  };

  const renderTechniques = (techniques: Technique[]) => {
    return (
      <tr>
        <td>
          <ul>
            {techniques.map((technique) => (
              <li key={technique.technique_id}>
                <strong>{technique.technique_id}:</strong> {technique.procedure}
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  };

  const renderSoftware = (software: Software[]) => {
    return (
      <tr>
        <td>{software.map((s) => s.name).join(', ')}</td>
      </tr>
    );
  };

  const renderOperations = (operations: Operation[]) => {
    return (
      <tr>
        <td>
          <ul>
            {operations.map((operation) => (
              <li key={operation.id}>
                <a href={operation.url} target="_blank" rel="noopener noreferrer">
                  {operation.name}
                </a>{' '}
                ({operation.date})
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  };

  const renderSources = (sources: Source[]) => {
    return (
      <tr>
        <td>
          <ul>
            {sources.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupName = e.target.value;
    if (!groupName) {
      setSelectedGroup(null);
      return;
    }
  
    try {
      const response = await axios.get<Group[]>(`${API_URL}/api/group/search/name/${groupName}`);
      setSelectedGroup(response.data[0]); // get first element of response data array
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="search-page">
      <h1>Search APT Groups</h1>
      <form>
        <div className="input-group">
          <label htmlFor="group">Group:</label>
          <select id="group" value={selectedGroup?.name || ''} onChange={handleChange}>
            <option value="">Select an APT Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
          <button type="submit">Search</button>
        </div>
      </form>
      {selectedGroup && (
        <div className="search-page">
        <h1>{selectedGroup.name}</h1>
          <h2>Group Details</h2>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{selectedGroup.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{selectedGroup.name}</td>
              </tr>
              <tr>
                <th>MITRE ID</th>
                <td>{selectedGroup.mitre_id}</td>
              </tr>
              <tr>
                <th>Associated Groups</th>
                <td>{selectedGroup.associated_groups}</td>
              </tr>
              {selectedGroup.aliases && (
                <tr>
                  <th>Aliases</th>
                  <td>
                    <table>
                      <tbody>
                        {renderArrayToLine(selectedGroup.aliases)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              <tr>
                <th>Location</th>
                <td>{selectedGroup.location}</td>
              </tr>
              <tr>
                <th>Sponsor</th>
                <td>{selectedGroup.sponsor}</td>
              </tr>
              {selectedGroup.motivation && (
                <tr>
                  <th>Motivation</th>
                  <td>
                    <table>
                      <tbody>
                        {renderArray(selectedGroup.motivation)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              <tr>
                <th>Description</th>
                <td>{selectedGroup.description}</td>
              </tr>
              {selectedGroup.targets && (
                <tr>
                  <th>Targets</th>
                  <td>
                    <table>
                      <tbody>
                      {renderTargets(selectedGroup.targets)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {selectedGroup.tactics && (
                <tr>
                  <th>Tactics</th>
                  <td>
                    <table>
                      <tbody>
                        {renderTactics(selectedGroup.tactics)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {selectedGroup.techniques && (
                <tr>
                  <th>Techniques</th>
                  <td>
                    <table>
                      <tbody>
                        {renderTechniques(selectedGroup.techniques)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {selectedGroup.softwares && (
                <tr>
                  <th>Software</th>
                  <td>
                    <table>
                      <tbody>
                        {renderSoftware(selectedGroup.softwares)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {selectedGroup.operations && (
                <tr>
                  <th>Operations</th>
                  <td>
                    <table>
                      <tbody>
                        {renderOperations(selectedGroup.operations)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {selectedGroup.sources && (
                <tr>
                  <th>Sources</th>
                  <td>
                    <table>
                      <tbody>
                        {renderSources(selectedGroup.sources)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default APTGroupPage;