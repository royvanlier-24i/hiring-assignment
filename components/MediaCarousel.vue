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
                ? 'background-image:url(https://image.tmdb.org/t/p/w342' +
                  item.poster_path +
                  ')'
                : ''
            "
          ></div>
          <div class="tfi-media-carousel__title">
            {{ item[titleProperty] }}
          </div>
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script>
/**
 * The carousel for displaying movies and tv series.
 * @displayName Media Carousel
 */
export default {
  name: 'TfiMediaCarousel',

  props: {
    /**
     * The items to be displayed in the carousel.
     */
    items: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * The type of items to be displayed in the carousel.
     * @values movie, tv
     */
    type: {
      type: String,
      default: 'movie'
    },
    /**
     * The name of the property that contains the title of the movie or tv serie.
     */
    titleProperty: {
      type: String,
      default: 'title'
    }
  },

  methods: {
    /**
     * Navigate to the detail page of the item that was clicked
     * @param {Object} dataset
     */
    goToDetailPage(dataset) {
      this.$router.push('/media/' + dataset.id + '?type=' + this.type)
    }
  }
}
</script>

<style scoped lang="scss" src="./scss/_media-carousel.scss"></style>
