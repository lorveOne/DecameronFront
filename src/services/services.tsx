import axios from 'axios';
import { Hotel } from '../types/Hotel';
import { ApiResponse } from '../types/ApiResponse'; 

const API_URL = 'https://backenddecameron.onrender.com/api/hoteles';

export const hotelService = {
  getAll: async (): Promise<Hotel[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Hotel>> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (hotel: Hotel): Promise<ApiResponse<Hotel>> => {
    const response = await axios.post(API_URL, hotel);
    return response.data;
  },

  update: async (id: number, hotel: Hotel): Promise<Hotel> => {
    const response = await axios.put(`${API_URL}/${id}`, hotel);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    return await axios.delete(`${API_URL}/${id}`);
  }
};
