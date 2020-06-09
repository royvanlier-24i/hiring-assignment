<template>
  <v-layout>
    <v-flex>
      <h1>Search</h1>
      <v-card class="tfi-inputs">
        <v-text-field
          v-model="query"
          label="Enter your search term"
          @keyup.enter="search"
        ></v-text-field>
        <v-btn @click="search">Go</v-btn>
      </v-card>
      <h2 class="tfi-search-results-header">Search results</h2>
      <tfi-media-carousel :items="searchResults"></tfi-media-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
import TfiMediaCarousel from '~/components/MediaCarousel.vue'

export default {
  components: {
    TfiMediaCarousel
  },

  data() {
    return {
      query: '',
      searchResults: []
    }
  },

  methods: {
    search() {
      this.$axios
        .get(
          'https://api.themoviedb.org/3/search/movie?api_key=' +
            process.env.API_KEY +
            '&query=' +
            this.query
        )
        .then(
          function(response) {
            this.searchResults = response.data.results
          }.bind(this)
        )
        .catch(
          function(error) {
            for (const message of error.response.data.errors) {
              this.$toast.error(message)
            }
          }.bind(this)
        )
    }
  }
}
</script>

<style scoped lang="scss" src="./scss/_search.scss"></style>
