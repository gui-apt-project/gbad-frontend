import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GroupExtended, GroupList } from '../data/group';
import { fetchGroupById, fetchGroupList } from '../services/group';
import GroupDetails from '../components/group-details';

const useGroupIdFromUrl = (): number | undefined => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const groupId = queryParams.get('groupId');

  return groupId ? parseInt(groupId, 10) : undefined;
};

const APTGroupPage: React.FC = () => {
  const [groups, setGroups] = useState<GroupList[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupExtended>();
  const [groupId, setGroupId] = useState<number>();

  useEffect(() => {
    fetchGroups();
  }, []);

  const initialGroupId = useGroupIdFromUrl();

  useEffect(() => {
    if (initialGroupId) {
      setGroupId(initialGroupId);
      fetchGroupDetails(initialGroupId);
    }
  }, [initialGroupId]);

  useEffect(() => {
    if (selectedGroup) {
      document.title = selectedGroup.name;
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      const groupList = await fetchGroupList();
      setGroups(groupList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = e.target.value;
    setGroupId(Number(groupId));
  };

  const fetchGroupDetails = async (id: number) => {
    try {
      const group = await fetchGroupById(id);
      setSelectedGroup(group);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupId) {
      return;
    }

    fetchGroupDetails(groupId);
  };

  return (
    <div className="search-page">
      <h1>Search APT Groups</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group">
          <select id="group" value={groupId} onChange={handleChange}>
            <option value="">Select an APT Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <button type="submit">Load</button>
        </div>
      </form>
      {selectedGroup && <GroupDetails group={selectedGroup} />}
    </div>
  );
};

export default APTGroupPage;
