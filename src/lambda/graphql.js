const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    greetings(name: String = "GRANDstack"): String
  }
`;

const resolvers = {
  Query: {
    greetings: (parent, args, context) => {
      return `Hello, ${args.name}!`;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const serverHandler = server.createHandler();

exports.handler = (event, context, cb) => {
  return serverHandler({
    ...event,
    requestContext: event.requestContext || {}
  }, context, cb);
};
