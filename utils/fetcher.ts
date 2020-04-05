import fetch from 'unfetch';
const fetcher = (query: string) =>
  fetch(`${process.env.fetchBaseUrl + query}api_key=${process.env.apiKey}`, {
    credentials: 'omit',
  }).then((r) => r.json());
export default fetcher;
