<h1 align="center"><strong>Game Grid Server</strong></h1>

<br />

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
