import axios from 'axios';
import { API_URL } from '../config/default';
import { Country, Industry } from '../data/group';

export const getIndustryList = async (): Promise<Industry[]> => {
    try {
      const response = await axios.get<Industry[]>(`${API_URL}/api/industry/list`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const getCountryList = async (): Promise<Country[]> => {
    try {
      const response = await axios.get<Country[]>(`${API_URL}/api/country/list`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };