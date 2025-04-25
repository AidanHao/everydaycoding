import { AxiosInstance } from 'axios'

declare module '../../api' {
  const axios: AxiosInstance
  export default axios
} 