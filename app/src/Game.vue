<template>
	<div class="gameinfo" :style="{backgroundImage: 'url(' + game.themeUrl + ')' }" @click="goback">
		<h1>{{game.name}}</h1>
		<span>{{game.description}}</span>


	</div>
</template>

<style>
	.gameinfo {
		padding: 100px;
		color: white;
		text-shadow: 1px 1px 1px black;
	}
</style>

<script>

	export default {
    name: 'Game',
    computed: {
			
			game() {
				return this.$route.params.game
			} 
		},
		methods: {
			goback() {
				this.$router.go(-1)
			},
		}
  }
</script>
