const data = require('../../data/all-games.json')
const dataHandler = require('../dataHandler')(data)

module.exports = {

  Query: {
    listTags (root, args, context) {
      return dataHandler.getTags()
    },
    listGameCollectionIds (root, args, context) {
      return dataHandler.getGameCollectionIds()
    },
    listGames (root, args, context) {
      const filteredList = dataHandler.getFilteredData({ gameProviders: args.filter.gameProviders, gameCollectionIds: args.filter.gameCollectionIds, tags: args.filter.tags }, args.pageSize)
      return {
        pages: filteredList.pages,
        currentPage: args.page,
        games: filteredList.page(args.page),
        gamesTotal: filteredList.totalDataSize
      }
    }

  },
  Game: {
    gameCollections (game, args, context) {
      return game.gameCollectionIds
    }
  },
  Tag: {
    name (tag, args, context) {
      return tag
    },
    id (tag, args, context) {
      return tag
    }
  },
  GameCollection: {
    name (gamecollection, args, context) {
      return gamecollection
    },
    id (gamecollection, args, context) {
      return gamecollection
    }
  }

}
