const LOCAL_API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:4000`

export const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL || LOCAL_API_BASE_URL
  : ''
