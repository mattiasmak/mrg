
<template>

  <div id="app">
    <router-view class="fullscreen-background"></router-view>
    <div class="grid">
      <h2>Simple Game Grid</h2>

      <div  v-if="tags">
        <select v-model="selectedTag">
          <option value="">ALL TAGS</option>
          <option v-for="tag in tags" v-bind:key="tag.id" :id="tag.id">{{tag.id}}</option>
        </select>
      </div>

      <div class="game-list" v-if="games">
        <div class="game-list-item" v-for="game in games.games" v-bind:key="game.id" @click="showGame(game)">
          <progressive-img :src="game.thumbnailUrl" placeholder="static/loader.gif" :blur="0" /> 
        </div>
        <div class="actions">
          <button v-if="showMoreEnabled" @click="showMore">Show more games</button>  
        </div>
        <span>Page {{this.page+1}} of {{this.totalPages}}</span>
      </div>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: Arial, Helvetica, sans-serif
  }
  .grid {
  }
  .game-list {
    display: inline-block;
  }
  .game-list-item {
    width: 266px;
    height: 200px;
    padding: 10px;
    display: inline-block;
  }
  .fullscreen-background {
    position:absolute;
    top: 20px;
    bottom: 20px;
    left: 20px;
    right:20px;
    z-index: 100;

  }
</style>

<script>
import gql from 'graphql-tag'


export default {
  name: 'app',
  data: () => ({
    page: 0,
    totalPages: 0,
    showMoreEnabled: true,
    selectedTag: ''
  }),
  apollo: {
    games: {
      query: gql`query listGames ($page: Int, $pageSize: Int, $filter: ListFilter ) {
        games: listGames(page: $page, pageSize: $pageSize, filter: $filter) {
          pages
          currentPage
          games {
            id
            name
            thumbnailUrl
            themeUrl
            description
          }
        }
      }`,
      update(res) {
        this.showMoreEnabled = res.games.currentPage+1 < res.games.pages
        this.totalPages = res.games.pages
        this.page = res.games.currentPage
        return res.games
      },
      variables() {
      return {
        page: 0,
        pageSize: 10,
        filter: this.selectedTag != '' ? {tags:[this.selectedTag]} : {tags:null} 
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
    showGame(game) {
      this.$router.push({ name: 'game', params: { id: game.id, game: game  }})
    },
    showMore() {
      this.page++
      this.$apollo.queries.games.fetchMore({
        
        variables: {
          page: this.page
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newGames = fetchMoreResult.games.games
          
          return {
            games: {
              __typename: previousResult.games.__typename,
              games: [...previousResult.games.games, ...newGames],
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