import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Proxied to backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ingestData = (input: { topic: string; sources?: string[] }) => api.post('/ingest', input);
export const modelKnowledge = (data: any[]) => api.post('/model', data);
export const generateHypotheses = (entities: any[], topic: string) => api.post('/hypothesis', { entities, topic });
export const runSimulation = (hypothesis: any) => api.post('/simulate', hypothesis);
export const validateExperiment = (simResult: any) => api.post('/validate', simResult);
export const updateModel = (validation: any) => api.post('/learn', validation);
export const fullFlow = (topic: string) => api.post('/full-flow', { topic });
export const ethicsCheck = (content: string) => api.post('/ethics-check', { content });

export default api;