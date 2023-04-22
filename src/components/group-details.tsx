import React from 'react';
import { GroupExtended, Target, Technique, Operation, Source, Software, Tactic } from '../data/group';

interface GroupDetailsProps {
  group: GroupExtended;
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {
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
      
      const renderArrayToLine = (inputArray: string[]) => {
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
    
      const renderArray = (inputArray: string[]) => {
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
  return (
    <div className="search-page">
        <h1>{group.name}</h1>
          <h2>Group Details</h2>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{group.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{group.name}</td>
              </tr>
              <tr>
                <th>MITRE ID</th>
                <td>{group.mitre_id}</td>
              </tr>
              <tr>
                <th>Associated Groups</th>
                <td>{group.associated_groups}</td>
              </tr>
              {group.aliases && (
                <tr>
                  <th>Aliases</th>
                  <td>
                    <table>
                      <tbody>
                        {renderArrayToLine(group.aliases)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              <tr>
                <th>Location</th>
                <td>{group.location}</td>
              </tr>
              <tr>
                <th>Sponsor</th>
                <td>{group.sponsor}</td>
              </tr>
              {group.motivation && (
                <tr>
                  <th>Motivation</th>
                  <td>
                    <table>
                      <tbody>
                        {renderArray(group.motivation)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              <tr>
                <th>Description</th>
                <td>{group.description}</td>
              </tr>
              {group.targets && (
                <tr>
                  <th>Targets</th>
                  <td>
                    <table>
                      <tbody>
                      {renderTargets(group.targets)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {group.tactics && (
                <tr>
                  <th>Tactics</th>
                  <td>
                    <table>
                      <tbody>
                        {renderTactics(group.tactics)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {group.techniques && (
                <tr>
                  <th>Techniques</th>
                  <td>
                    <table>
                      <tbody>
                        {renderTechniques(group.techniques)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {group.softwares && (
                <tr>
                  <th>Software</th>
                  <td>
                    <table>
                      <tbody>
                        {renderSoftware(group.softwares)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {group.operations && (
                <tr>
                  <th>Operations</th>
                  <td>
                    <table>
                      <tbody>
                        {renderOperations(group.operations)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {group.sources && (
                <tr>
                  <th>Sources</th>
                  <td>
                    <table>
                      <tbody>
                        {renderSources(group.sources)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  );
};

export default GroupDetails;