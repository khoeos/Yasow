import { BASE_URL } from '@/config';

type RequestedData = 'tags' | 'notes' | 'all';

/**
 * Utility function to fetch main data from the server
 * @param requestedData
 * @returns
 */
export const getData = async (requestedData: RequestedData) => {
  const res = await fetch(`${BASE_URL}/api/getData`, {
    headers: {
      'x-api-secret': process.env.API_SECRET_TOKEN || '',
    },
  });
  if (!res.ok) {
    throw new Error('[getData()] Failed to fetch data');
  }
  const data = await res.json();

  if (requestedData === 'all') {
    return data;
  } else {
    return data[requestedData];
  }
};
