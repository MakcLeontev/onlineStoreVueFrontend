<template>
  <div>
    <div class="container">
        <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://img.freepik.com/free-photo/person-enjoying-warm-and-nostalgic-sunset_52683-100695.jpg?t=st=1710000617~exp=1710001217~hmac=45038be41719ee18661c48991c2c2f291f03d5fd9af715665220b5ae0ef16235"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://img.freepik.com/free-photo/analog-portrait-of-beautiful-woman-posing-artistically-indoors_23-2149630182.jpg?t=st=1710000617~exp=1710001217~hmac=90a50c78a143a2c4e82e2b72f2fc85280fe9405949db7ed64e49ba9fbdbe1ad9"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://img.freepik.com/free-photo/front-view-smiley-woman-with-fireworks_52683-98180.jpg?t=st=1710000617~exp=1710001217~hmac=3ad38d8af3a484e80d4612eeb7127b415120b08c6a2d294ff023344346e39b48&w=826"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "CaruselPage",
  data() {
    return {};
  },
};
</script>
