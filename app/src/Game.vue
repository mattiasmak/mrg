<template>
	<div class="hej" :style="{backgroundImage: 'url(' + this.background + ')' }">
	
	</div>
</template>

<style>

</style>

<script>

	export default {
    name: 'Game',
    computed: {
			background() {
				return this.$route.params.game.themeUrl
			},
			
		},
  }
</script>
