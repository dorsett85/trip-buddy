/**
 * Fetch api wrapper for graphql queries
 * @param   {RequestInfo}  url - first argument of fetch api
 * @param   {string}       query - string in graphql query format
 */
export const graphqlGet = async (
  url: RequestInfo,
  query: string
): Promise<any> => {
  const response = await fetch(`${url}?query=${query}`);
  return response.json();
};

/**
 * Fetch api wrapper for graphql mutations
 * @param   {RequestInfo}  url - first argument of fetch api
 * @param   {string}       mutation - string in graphql mutation format
 */
export const graphqlPost = async (
  url: RequestInfo,
  mutation: string
): Promise<any> => {
  const query = JSON.stringify({ query: mutation });
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: query
  });
  return response.json();
};
