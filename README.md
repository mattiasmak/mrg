<strong>Game Grid GraphQL Server</strong>

Minimal GraphQL server to serve game data for app.

## Getting started

```
npm install 
npm start
```

When server is up and running, browser to url: `http://localhost:4000/` and try a few queries:

```
query {
  tags: listTags {
    name
  }
}
```

```
query {
  gameCollectionIds: listGameCollectionIds {
    id
  }
}
```

```
query {
  games: listGames(page: 0, filter: { gameProviders: ["PLAYNGO"] }, pageSize:5) {
    pages
    currentPage
    games {
      name
      thumbnailUrl
      gameCollections {
        id
      }
    }
  }
}
```
