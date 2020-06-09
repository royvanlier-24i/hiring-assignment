<template>
  <div class="tfi-media-carousel-container">
    <client-only>
      <carousel
        ref="popularMoviesCarousel"
        class="tfi-media-carousel"
        :per-page="2"
        :navigate-to="0"
        pagination-active-color="#F00"
        :pagination-padding="2"
        :pagination-size="8"
        :per-page-custom="[
          [600, 4],
          [960, 6],
          [1264, 8]
        ]"
      >
        <slide
          v-for="item in items"
          :key="item.id"
          class="tfi-media-carousel__slide"
          :data-id="item.id"
          @slideclick="goToDetailPage"
        >
          <div
            class="tfi-media-carousel__image"
            :style="
              item.poster_path
                ? 'background-image:url(http://image.tmdb.org/t/p/w342' +
                  item.poster_path +
                  ')'
                : ''
            "
          ></div>
          <div class="tfi-media-carousel__title">
            {{ item[titleAttribute] }}
          </div>
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'TfiMediaCarousel',

  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: 'movie'
    },
    titleAttribute: {
      type: String,
      default: 'title'
    }
  },

  methods: {
    goToDetailPage(dataset) {
      this.$router.push('/media/' + dataset.id + '?type=' + this.type)
    }
  }
}
</script>

<style scoped lang="scss" src="./scss/_media-carousel.scss"></style>
