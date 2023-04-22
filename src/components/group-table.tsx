// src/components/group_details.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Group } from '../data/group';

interface GroupTableProps {
  groupList: Group[];
}

const GroupTable: React.FC<GroupTableProps> = ({ groupList }) => {
  
    
  const renderArray = (inputArray: string[]) => {
    return inputArray.map((inputItem) => (
      <tr key={inputItem}>
        <td>{inputItem}</td>
      </tr>
    ));
  }

  return (
    <div>
    {groupList.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>MITRE ID</th>
            <th>Aliases</th>
            <th>Location</th>
            <th>Sponsor</th>
            <th>Motivation</th>
          </tr>
        </thead>
        <tbody>
          {groupList.map((group) => (
            <tr key={group.id}>
              <td>
                <Link to={`/groups?groupId=${group.id}`}>{group.id}</Link>
              </td>
              <td>{group.name}</td>
              <td>{group.mitre_id}</td>
              <td>{renderArray(group.aliases)}</td>
              <td>{group.location}</td>
              <td>{group.sponsor}</td>
              <td>{renderArray(group.motivation)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )};
  </div>
)};

export default GroupTable;