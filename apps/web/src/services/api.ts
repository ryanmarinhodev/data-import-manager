import axios from 'axios'

export interface HealthResponse {
  status: string
  date: string
  environment: string
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3333',
  timeout: 5000,
})

export async function getHealth() {
  const response = await api.get<HealthResponse>('/health')
  return response.data
}
