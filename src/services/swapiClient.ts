import axios from 'axios';
import {
  Character,
  PaginatedCharacters,
  PaginatedSpecies,
  Planet,
  Species,
} from '../interfaces';
import { SWAPI_BASE_URL } from '../config';

const baseURL = new URL(SWAPI_BASE_URL).toString();
const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message;
    return Promise.reject(new Error(message));
  },
);

export const swapiClient = {
  getCharacters: async (page = 1): Promise<PaginatedCharacters> => {
    const response = await client.get<PaginatedCharacters>('/people', {
      params: { page },
    });
    return response.data;
  },

  getCharacter: async (id: string): Promise<Character> => {
    const response = await client.get<Character>(`/people/${id}`);
    return response.data;
  },

  getSpecies: async (page = 1) => {
    const response = await client.get<PaginatedSpecies>('/species', {
      params: { page },
    });
    return response.data;
  },

  getSpeciesById: async (id: string) => {
    const response = await client.get<Species>(`/species/${id}`);
    return response.data;
  },

  getPlanet: async (id: string) => {
    const response = await client.get<Planet>(`/planets/${id}`);
    return response.data;
  },
};
