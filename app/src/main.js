import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import VueProgressiveImage from 'vue-progressive-image'
import Game from './Game'

Vue.use(VueProgressiveImage)

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)
Vue.use(Router)

const apolloProvider = new VueApollo({
  defaultClient: client
})

const router = new Router({
  routes: [
    { path: 'game/:id', name: 'game', component: Game }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  provide: apolloProvider.provide(),
  render: h => h(App)
})
