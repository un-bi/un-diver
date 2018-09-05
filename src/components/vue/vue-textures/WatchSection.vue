<template>
  <div class="watch-section">
    <div v-for="item in watchData.intro.items" :key="item.id" v-html-to-texture="getIntroId(item.id)" class="watch-section__intro">{{ item.text }}</div>

    <div class="watch-section__features">
      <div class="watch-section__features--container" v-html-to-texture="getFeatureId(item.id)" v-for="item in watchData.features.items" :key="item.id">
        <div v-if="item.title" class="watch-section__features--title">{{ item.title }}</div>
        <div class="watch-section__features--text">{{ item.text }}</div>
      </div>
    </div>

    <div v-html-to-texture="'watch-section-details'" class="watch-section__details">
      <div class="watch-section__details--title">{{ watchData.details.title }}</div>
      <div class="watch-section__details--sku">{{ watchData.details.sku }}</div>
      <div class="watch-section__details--movementLabel">{{ watchData.details.movementLabel }}</div>
      <div class="watch-section__details--movementText">{{ watchData.details.movementText }}</div>
      <div class="watch-section__details--caseLabel">{{ watchData.details.caseLabel }}</div>
      <div class="watch-section__details--caseDiameter">{{ watchData.details.caseDiameter }}</div>
      <div class="watch-section__details--caseHeight">{{ watchData.details.caseHeight }}</div>
      <div class="watch-section__details--caseWater">{{ watchData.details.caseWater }}</div>
      <div class="watch-section__details--price">{{ watchData.details.price }}</div>
    </div>

    <c-link v-html-to-texture="'watch-section-details-button'" :href="''" :label="'dive to the other models'" class="header__link"></c-link>
  </div>
</template>

<script>
import Link from '@/components/vue/Link.vue'

export default {
  name: 'WatchSection',
  components: {
    'c-link': Link
  },
  props: {
    watchData: {
      type: Object,
      required: true
    }
  },
  methods: {
    getFeatureId (id) {
      return 'watch-section-feature-' + id
    },
    getIntroId (id) {
      return 'watch-section-intro-' + id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_vars.scss';

.watch-section {
  position: fixed;
  top: 0;
  width: 200vw;

  &__intro {
    display: inline-block;
    color: $white;
    font-size: $fs-watch-title;
    line-height: initial;
    font-weight: 300;
    text-align: center;
  }

  &__features {
    &--container {
      display: inline-block;
    }
    &--title {
      text-transform: uppercase;
      font-size: $fs-watch-feature-title;
      font-weight:$fw-light;
      color: $gold;
      line-height: 2em;
    }
    &--text {
      font-size: $fs-watch-feature-text;
      font-weight: $fw-medium;
      color: $white;
      white-space: pre;
      line-height: 1.2em;
    }
  }

  &__details {
    display: inline-block;
    color: $white;
    &--title {
      font-size: $fs-watch-feature-text;
      font-weight: $fw-medium;
    }
    &--sku {
      font-weight: $fw-light;
      margin-bottom: 2em;
    }
    &--movementLabel, &--caseLabel {
      color: $gold;
      font-weight: $fw-light;
      text-transform: uppercase;
      line-height: 2em;
      margin-bottom: 1em;
    }
    &--movementText {
      white-space: pre-line;
      word-break: normal;
      width: 340px;
    }
    &--caseLabel {}
    &--caseDiameter, &--caseHeight, &--caseWater {
      line-height: 3em;
    }
    &--caseDiameter {}
    &--caseHeight {}
    &--caseWater {}
    &--price {
      display: inline-block;
      position: relative;
      font-weight:$fw-light;
      font-size: $fs-watch-price;
      margin-top: 1em;
      padding: 0 5px;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 20px;
        background: $gold;
        bottom: 4px;
        left: 0;
        z-index: -1;
      }
    }
  }
}

</style>