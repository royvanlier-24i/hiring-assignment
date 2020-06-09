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
        <v-btn color="primary" class="tfi-trailer-trigger" @click="viewTrailer"
          >View trailer</v-btn
        >
      </div>
    </v-flex>
    <v-flex xs12 sm6 offset-sm1>
      <div v-show="!showTrailer" class="tfi-visual">
        <div class="tfi-visual__spacer">
          <hr />
        </div>
        <img
          class="tfi-visual__image"
          :src="'http://image.tmdb.org/t/p/w342' + details.poster_path"
        />
      </div>
      <div v-show="showTrailer" class="tfi-video">
        <video
          id="video"
          class="tfi-video__player"
          width="100%"
          :poster="'http://image.tmdb.org/t/p/w342' + details.poster_path"
          controls
          autoplay
        ></video>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},

  async asyncData({ $axios, $payloadURL, route, payload }) {
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
  },

  data() {
    return {
      showTrailer: false
    }
  },

  mounted() {
    this.initApp()
  },

  methods: {
    initApp() {
      // Install built-in polyfills to patch browser incompatibilities.
      window.shaka.polyfill.installAll()

      // Check to see if the browser supports the basic APIs Shaka needs.
      if (window.shaka.Player.isBrowserSupported()) {
        // Everything looks good!
        this.initPlayer()
      } else {
        // This browser does not have the minimum set of APIs we need.
        this.$toast.error('Browser not supported!')
      }
    },

    initPlayer() {
      // Create a Player instance.
      const video = document.getElementById('video')
      const player = new window.shaka.Player(video)

      // Attach player to the window to make it easy to access in the JS console.
      window.player = player

      // Listen for error events.
      player.addEventListener('error', this.onErrorEvent)
    },

    onErrorEvent(event) {
      // Extract the shaka.util.Error object from the event.
      this.onError(event.detail)
    },

    onError(error) {
      this.$toast.error(error.code)
    },

    viewTrailer() {
      this.showTrailer = true

      // Try to load a manifest.
      // This is an asynchronous process.
      window.player
        .load(
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        )
        .then(function() {
          // This runs if the asynchronous load is successful.
        })
        .catch(this.onError.bind(this))
    }
  }
}
</script>

<style scoped lang="scss" src="./scss/_id.scss"></style>
