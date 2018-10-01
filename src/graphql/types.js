module.exports = `

enum Status {
  ACTIVE
  INACTIVE
}

enum StartType {
  IFRAME
  CUSTOM
}

enum Orientation {
  ALL
  PORTRAIT
}

enum Sortby {
  NAME
}

type GameProvider {
  id: ID
  name: String
}

type Tag {
  id: ID
  name: String
}

type GameCollection {
  id: ID
  name: String
}

type Game {
  id: ID
  name: String
  seoName: String
  friendlyName: String
  status: Status
  gameProvider: GameProvider
  freeplayAllowed: Boolean
  leavingJurisdiction: Boolean
  allowedOrientation: Orientation
  gameCollections: [GameCollection]
  description: String
  themeUrl: String
  thumbnailUrl: String
  helpUrl: String
  nextOpeningTimeUtc: Int
  openingTimeUtc: Int 
  closingTimeUtc: Int
  trivia: [String]
}

type PagedGames {
  pages: Int,
  currentPage: Int,
  gamesTotal: Int
  games: [Game]
}

input ListFilter {
  gameProviders: [String] = null
  gameCollectionIds: [String] = null
}

type Query {
  listGames(filter: ListFilter, sort: Sortby = "NAME", page: Int = 0, pageSize: Int = 10): PagedGames
  listTags: [Tag]
  listGameCollectionIds: [GameCollection]
}

`
