<template>
  <v-layout row>
    <v-flex xs12 sm5>
      <h1 v-if="$route.query.type === 'movie'">{{ details.title }}</h1>
      <h1 v-if="$route.query.type === 'tv'">{{ details.name }}</h1>
      <p>{{ details.overview }}</p>
      <hr />
      <div class="tfi-specs">
        <div v-show="$route.query.type === 'movie'">
          <dl>
            <dt>Tagline</dt>
            <dd>{{ details.tagline }}</dd>
            <dt>Release date</dt>
            <dd>{{ details.release_date }}</dd>
            <dt>Length</dt>
            <dd>{{ details.runtime }} minutes</dd>
            <dt>Rating</dt>
            <dd>{{ details.vote_average }}</dd>
            <dt>Language</dt>
            <dd>
              <span
                v-for="(item, index) in details.spoken_languages"
                :key="index"
              >
                {{
                  item.name +
                    (index === details.spoken_languages.length - 1 ? '' : ',')
                }}
              </span>
            </dd>
          </dl>
        </div>
        <div v-show="$route.query.type === 'tv'">
          <dl>
            <dt>First air date</dt>
            <dd>{{ details.first_air_date }}</dd>
            <dt>Last air date</dt>
            <dd>{{ details.last_air_date }}</dd>
            <dt>Number of seasons</dt>
            <dd>{{ details.number_of_seasons }}</dd>
            <dt>Number of episodes</dt>
            <dd>{{ details.number_of_episodes }}</dd>
            <dt>Rating</dt>
            <dd>{{ details.vote_average }}</dd>
          </dl>
        </div>
        <v-btn color="primary" class="tfi-trailer-trigger">View trailer</v-btn>
      </div>
    </v-flex>
    <v-flex xs12 sm6 offset-sm1>
      <div class="tfi-visual">
        <div class="tfi-visual__spacer">
          <hr />
        </div>
        <img
          class="tfi-visual__image"
          :src="'http://image.tmdb.org/t/p/w342' + details.poster_path"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},

  async asyncData({ $axios, $payloadURL, route, payload }) {
    // When generating the app, if payload from running nuxt generate is available then use it
    if (payload) {
      return {
        details: payload
      }
    }

    // In production, if generated and works as client navigation, fetch previously saved static JSON payload
    if (process.static && process.client) {
      const payload = await $axios.$get($payloadURL(route))
      return payload
    }

    // When developing, fetch the data
    const postDetails = await $axios.$get(
      route.query.type +
        '/' +
        route.params.id +
        '?api_key=' +
        process.env.API_KEY
    )

    return {
      details: postDetails
    }
  }
}
</script>

<style scoped lang="scss" src="./scss/_id.scss"></style>
