import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const initGame = async (name: string, complexity: number) => {
  try {
    const response = await api.post('/init', { name, complexity });
    return response.data.id;
  } catch (error) {
    console.error('Error initializing game:', error);
    throw error;
  }
};

export const getTokenChunk = async (id: string, chunkNo: number) => {
  try {
    const response = await api.get(`/token/${chunkNo}`, { params: { id } });
    return response.data.chunk;
  } catch (error) {
    console.error(`Error fetching token chunk ${chunkNo}:`, error);
    throw error;
  }
};

export default api;
