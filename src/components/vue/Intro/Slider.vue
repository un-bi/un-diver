<template>
  <div class="slider">
    <div class="slider__container">
      <vueper-slides
        class="no-shadow"
        :fade="true"
        :bullets="false"
        :touchable="isMobile"
        fixed-height="100vh"
        :infinite="false"
        :autoplay="false"
        disableArrowsOnEdges="true"
      >
        <vueper-slide :key="index" v-for="(slide, index) in slides">
          <div slot="slideContent">
            <div
              class="slider__slide slider__slide--left"
              :class="{'slider__slide--left': slide.align == 'left', 'slider__slide--right': slide.align == 'right'}"
            >
              <p class="text" v-html="slide.text"></p>
              <tilt class="image" :src="slide.image"></tilt>
            </div>
          </div>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.min.css'

import Tilt from '@/components/vue/Intro/Tilt.vue'
import Utils from '@/utils/Utils'

export default {
  name: 'slider',
  data () {
    return {
      isMobile: Utils.isMobile()
    }
  },
  computed: {
    slides () {
      return [
        {
          align: 'left',
          text: this.$t('slide_1_text'),
          image: `images/slider/intro_01.jpg`
        },
        {
          align: 'right',
          text: this.$t('slide_2_text'),
          image: `images/slider/intro_02.jpg`
        },
        {
          align: 'left',
          text: this.$t('slide_3_text'),
          image: `images/slider/intro_03.jpg`
        },
        {
          align: 'right',
          text: this.$t('slide_4_text'),
          image: `images/slider/intro_04.jpg`
        },
        {
          align: 'left',
          text: this.$t('slide_5_text'),
          image: `images/slider/intro_05.jpg`
        }
      ]
    }
  },
  components: {
    Tilt,
    VueperSlides,
    VueperSlide
  }
}
</script>

<style lang="scss">
@import '@/scss/_vars.scss';
@import '@/scss/_mixins.scss';

.slider {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  opacity:0;

  .text {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    color:$white;
    font-size:35px;
    font-weight:$fw-medium;
    line-height:40px;
    text-align:left;
    z-index:1;
    text-shadow: 2px 1px 10px rgba(0, 0, 0, 0.7);
    @include small-only {
      position:relative;
      top:auto;
      transform:none;
      font-size: 16px;
      margin-top:12px;
      line-height:22px;
      text-align:center;
      u:before {
        height:5px;
      }
    }
  }
  .image {
    position:relative;
    width:60%;
    z-index:-1;
    @include small-only {
      width:100%;
    }
  }
  &__container {
    position:relative;
    width:100%;
    height:100%;
    .vueperslides {
      top:50%;
      transform:translateY(-50%);
      @include small-only {
        top:0;
        transform:none;
      }
    }
    .vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {
      @include small-only {
        top:16vh;
        transform: translate(-50%, 0);
      }
    }
  }
  &__slide {
    display:flex;
    width:60vw;
    @include small-only {
      width:80vw;
      flex-direction: column-reverse;
    }
    &--left {
      justify-content:flex-end;
      @include small-only {
        justify-content: flex-start;
      }
      .text {
        left:0;
        right:40%;
        @include small-only {
          right:auto;
          left:auto;
        }
      }
    }
    &--right {
      justify-content: flex-start;
      @include small-only {
        justify-content: flex-start;
      }
      .text {
        right:0;
        left:55%;
        @include small-only {
          right:auto;
          left:auto;
        }
      }
    }
    &--center {
      justify-content: center;
      flex-direction: column;
      .text {
        margin: 20px auto;
        position:relative;
        top:auto;
        text-align:center;
        max-width:625px;
      }
    }
  }
  @keyframes handAnim {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(10px);
    }
  }
}
</style>
