import axios from 'axios';
import { Habitacion } from '../types/Habitacion';
import { ApiResponse } from '../types/ApiResponse'; 

const API_URL = 'http://localhost:8000/api/habitaciones';

export const HabitaService = {
  getAll: async (): Promise<Habitacion[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: string): Promise<Habitacion[]> => {
    const response = await axios.get(`${API_URL}/${id}/habitaciones`);
    return response.data;
  },

  getByIdH: async (id: string): Promise<Habitacion[]> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },


  create: async (hotel: Habitacion): Promise<ApiResponse<Habitacion>> => {
    const response = await axios.post(API_URL, hotel);
    return response.data;
  },

  update: async (id: string, hotel: Habitacion): Promise<ApiResponse<Habitacion>> => {
    const response = await axios.put(`${API_URL}/${id}`, hotel);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
