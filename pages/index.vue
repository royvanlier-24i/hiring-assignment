<template>
  <v-layout>
    <v-flex>
      <h2>Popular movies</h2>
      <tfi-media-carousel :items="popularMovies"></tfi-media-carousel>
      <h2>Popular series</h2>
      <tfi-media-carousel
        :items="popularSeries"
        type="tv"
        title-attribute="name"
      ></tfi-media-carousel>
      <h2>Genre family</h2>
      <tfi-media-carousel :items="genreFamily"></tfi-media-carousel>
      <h2>Genre documentary</h2>
      <tfi-media-carousel :items="genreDocumentary"></tfi-media-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
import TfiMediaCarousel from '~/components/MediaCarousel.vue'

export default {
  components: {
    TfiMediaCarousel
  },

  async asyncData({ $axios, $payloadURL, route, payload }) {
    // Get popular movies from api
    const postPopularMovies = await $axios.$get(
      `movie/popular?api_key=${process.env.API_KEY}`
    )
    // Get popular series from api
    const postPopularSeries = await $axios.$get(
      `tv/popular?api_key=${process.env.API_KEY}`
    )
    // Get movies from family genre
    const postGenreFamily = await $axios.$get(
      `discover/movie?with_genres=10751&api_key=${process.env.API_KEY}`
    )
    // Get movies from documentary genre
    const postGenreDocumentary = await $axios.$get(
      `discover/movie?with_genres=99&api_key=${process.env.API_KEY}`
    )

    // Return all the results
    return {
      popularMovies: postPopularMovies.results,
      popularSeries: postPopularSeries.results,
      genreFamily: postGenreFamily.results,
      genreDocumentary: postGenreDocumentary.results
    }
  }
}
</script>

<style scoped lang="scss" src="./scss/_index.scss"></style>
