<template>
  <div id="app">
    <h2>Pagination</h2>
    <div class="tag-list" v-if="games">
      <div class="tag-list-item" v-for="game in games.games" v-bind:key="game.name">
        <img :src="game.thumbnailUrl"> 
      </div>
      <div class="actions">
        <button v-if="showMoreEnabled" @click="showMore">Show more games</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'


export default {
  name: 'app',
  data: () => ({
    page: 0,
    showMoreEnabled: true,
  }),
  apollo: {
    // Pages
    games: {
      // GraphQL Query
      query: gql`query listGames ($page: Int) {
        games: listGames(page: $page, filter: {gameProviders:["PLAYNGO"]}) {
          pages
          currentPage
          games {
            name
            thumbnailUrl
          }
        }
      }`,
      // Initial variables
      variables: {
        page: 0
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
            }
          }
        },
      })
    },
  },
}
</script>