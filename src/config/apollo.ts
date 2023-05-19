import { ApolloClient } from "apollo-client";
import fetch from "cross-fetch";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const queryGraphql = async (query: any, variables?: any) => {
  try {
    let client = new ApolloClient({
      link: createHttpLink({
        uri: process.env.GRAPH_URL,
        fetch: fetch,
        headers: {
          "mb-api-key": "anon",
          "Content-Type": "application/json",
        },
      }),
      cache: new InMemoryCache(),
    });

    if (!variables) {
      let result = await client.query({
        query,
      });
      return result.data;
    } else {
      let result = await client.query({
        query,
        variables,
      });
      return result.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { queryGraphql };
