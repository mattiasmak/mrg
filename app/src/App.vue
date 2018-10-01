<template>
  <div id="app">
    <h2>Simple Game Grid</h2>


    <div  v-if="tags">
      TAGS
      <select v-model="selected">
        <option disabled value="">ALL TAGS</option>
        <option  v-for="tag in tags" v-bind:key="tag.id" :id="tag.id">{{tag.id}}</option>
      </select>
    </div>
    

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
    selected: ''
  }),
  apollo: {
    games: {
      query: gql`query listGames ($page: Int, $pageSize: Int, $filter: ListFilter ) {
        games: listGames(page: $page, pageSize: $pageSize, filter: $filter) {
          pages
          currentPage
          games {
            name
            thumbnailUrl
          }
        }
      }`,
      update(res) {
        return res.games
      },
      variables() {
      return {
        page: 0,
        pageSize: 10,
        filter: this.selected != '' ? {tags:[this.selected]} : {tags:null} 
      }
    },
    },
    tags: {
      query: gql`query listTags {
        tags: listTags {
            id
          }
      }`,
      update(res) {
        return res.tags
      },
      
    },
  },
  
  methods: {
    showMore() {
      this.page++
      this.$apollo.queries.games.fetchMore({
        
        variables: {
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newGames = fetchMoreResult.games.games
          const hasMore = fetchMoreResult.games.currentPage + 1 < fetchMoreResult.games.pages
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