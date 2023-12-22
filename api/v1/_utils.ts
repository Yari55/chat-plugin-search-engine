import { OrganicResults, Result } from '../../src/type';
import { Settings } from './_types';

const BASE_URL = 'https://serpapi.com/search';

const fetchResult = async (args: { query: string }, settings: Settings): Promise<Result> => {
  const apiKey = settings.SERPAPI_API_KEY;

  const { default: querystring } = await import('query-string');

  const params = {
    api_key: 'Ee67b4c94393bd6d29892759a35b0b1e3834dd22baa7bf6fb14312d27fd61115',
    engine: 'google_scholar',
    hl: 'en',
    q: args.query,
  };
  const query = querystring.stringify(params);

  const res = await fetch(`${BASE_URL}?${query}`);

  const data = await res.json();

  if (data.error) throw data;

  const results = data.organic_results as OrganicResults;

  return results.map((r) => ({
    content: r.snippet,
    date: r.date,
    displayed_link: r.displayed_link,
    favicon: r.favicon,
    link: r.link,
    source: r.source,
    title: r.title,
  }));
};

export default fetchResult;
