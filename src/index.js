
const config = require('exp-config')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/types')

// console.log(dataHandler.getGameProviders())
// console.log(dataHandler.getFilteredData(null, 'width'))
// console.log(dataHandler.getFilteredData({ gameProviders: null, gameCollectionIds: ['cup-2'] }))

// const paginatedData = dataHandler.getFilteredData({ gameProviders: null, gameCollectionIds: ['cup-2'] })

// console.log(paginatedData.page(0), paginatedData.pages)

const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port: config.server.port, playground: true })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
