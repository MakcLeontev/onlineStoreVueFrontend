<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Текстовые слайды с изображением -->
      <b-carousel-slide
        caption="Первый слайд"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Слайды с произвольным текстом -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Привет мир!</h1>
      </b-carousel-slide>

      <!-- Слайды только с изображением -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Слайды со слотом img -->
      <!-- Обратите внимание на классы .d-block и .img-fluid, чтобы предотвратить выравнивание изображений по умолчанию в браузере -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="слот изображения"
          >
        </template>
      </b-carousel-slide>

      <!-- Слайд с пустым плавным изображением для сохранения пропорций слайда -->
      <b-carousel-slide caption="Пустое изображение" img-blank img-alt="Пустое изображение">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>

    <p class="mt-4">
      Слайд #: {{ slide }}<br>
      Слайдинг: {{ sliding }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>