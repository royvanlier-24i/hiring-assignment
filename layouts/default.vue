<template>
  <v-app dark>
    <v-content>
      <v-container grid-list-lg>
        <tfi-header />
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TfiHeader from '~/components/Header.vue'

export default {
  components: {
    TfiHeader
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="scss" src="./scss/_default.scss"></style>
