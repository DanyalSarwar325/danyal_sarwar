import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const  client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    },
  }),
  cache: new InMemoryCache(),
});
