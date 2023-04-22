import axios from 'axios';
import { API_URL } from '../config/default';
import { Group, GroupExtended, GroupList } from '../data/group';

export const fetchGroupById = async (groupId: number): Promise<GroupExtended> => {
  const response = await axios.get<GroupExtended>(`${API_URL}/api/group/${groupId}`);
  return response.data;
};

export const fetchGroupList = async (): Promise<GroupList[]> => {
  const response = await axios.get<GroupList[]>(`${API_URL}/api/group/list-light`);
  return response.data;
};

export const fetchGroupLightById = async (groupId: number): Promise<Group> => {
  const response = await axios.get<Group>(`${API_URL}/api/group/light/${groupId}`);
  return response.data;
};

export const searchGroupByMitreId = async (mitreId: string): Promise<Group[]> => {
  const response = await axios.get<Group[]>(`${API_URL}/api/group/search/mitre_id/${mitreId}`);
  return response.data;
};

export const searchGroupByAlias = async (alias: string): Promise<Group[]> => {
  const response = await axios.get<Group[]>(`${API_URL}/api/group/search/alias/${alias}`);
  return response.data;
};

export const searchGroupByTargetIndustry = async (industryName: string): Promise<Group[]> => {
  const response = await axios.get<Group[]>(`${API_URL}/api/group/search/target-industry/${industryName}`);
  return response.data;
};

export const searchGroupByTargetCountry = async (countryName: string): Promise<Group[]> => {
  const response = await axios.get<Group[]>(`${API_URL}/api/group/search/target-country/${countryName}`);
  return response.data;
};