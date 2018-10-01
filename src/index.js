
const config = require('exp-config')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/types')
const { ApolloServer } = require('apollo-server')
const server = new ApolloServer({ typeDefs, resolvers })

server.listen(
  {
    port: config.server.port,
    playground: true
  })
  .then(({ url }) => {
    console.log(`🚀 Server started at ${url}`)
  })
