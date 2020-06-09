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
    // When generating the app, if payload from running nuxt generate is available then use it
    if (payload) {
      return {
        popularMovies: payload.popularMovies,
        popularSeries: payload.popularSeries,
        genreFamily: payload.genreFamily,
        genreDocumentary: payload.genreDocumentary
      }
    }

    // In production, if generated and works as client navigation, fetch previously saved static JSON payload
    if (process.static && process.client) {
      const payload = await $axios.$get($payloadURL(route))
      return payload
    }

    // When developing, fetch the data
    const postPopularMovies = await $axios.$get(
      'movie/popular?api_key=' + process.env.API_KEY
    )
    const postPopularSeries = await $axios.$get(
      'tv/popular?api_key=' + process.env.API_KEY
    )
    const postGenreFamily = await $axios.$get(
      'discover/movie?with_genres=10751&api_key=' + process.env.API_KEY
    )
    const postGenreDocumentary = await $axios.$get(
      'discover/movie?with_genres=99&api_key=' + process.env.API_KEY
    )

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
