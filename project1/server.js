import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFile } from 'fs/promises';
import { resolvers } from './resolver.js';

const app = express();
const PORT = 9000;

const typeDefs = await readFile('./schema.graphql', 'utf8');
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
});
