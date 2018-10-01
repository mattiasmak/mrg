<template>
  <div id="app">
    <h2>Simple Game Grid</h2>
    <div class="game-list" v-if="games">
      <div class="game-list-item" v-for="game in games.games" v-bind:key="game.name">
        <progressive-img :src="game.thumbnailUrl" placeholder="static/loader.gif" :blur="0" /> 
      </div>
      <div class="actions">
        <button v-if="showMoreEnabled" @click="showMore">Show more games</button>
      </div>
    </div>
  </div>
</template>

<style>
  .game-list {
    display: inline-block;
  }
  .game-list-item {
    width: 266px;
    height: 200px;
    padding: 10px;
    display: inline-block;
}
</style>

<script>
import gql from 'graphql-tag'


export default {
  name: 'app',
  data: () => ({
    page: 0,
    showMoreEnabled: true,
  }),
  apollo: {
    games: {
      query: gql`query listGames ($page: Int, $pageSize: Int) {
        games: listGames(page: $page, pageSize: $pageSize, filter: {gameProviders:["PLAYNGO"]}) {
          pages
          currentPage
          games {
            name
            thumbnailUrl
          }
        }
      }`,
      variables: {
        page: 0,
        pageSize: 10
      },
    },
  },
  
  methods: {
    
    showMore() {
      this.page ++
      this.$apollo.queries.games.fetchMore({
        
        variables: {
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newGames = fetchMoreResult.games.games
          const hasMore = fetchMoreResult.games.currentPage < fetchMoreResult.games.pages
          this.showMoreEnabled = hasMore
  
          return {
            games: {
              __typename: previousResult.games.__typename,
              games: [...previousResult.games.games, ...newGames],
              hasMore,
              pages: fetchMoreResult.games.pages,
              currentPage: fetchMoreResult.games.currentPage
            }
          }
        },
      })
    },
  },
}
</script>