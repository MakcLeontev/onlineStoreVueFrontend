<template>
  <div class="container d-flex">
    <aside
      class="bd-aside sticky-xl-top text-body-secondary align-self-start mb-3 mb-xl-5 px-2"
    >
      <h2 class="h6 pt-4 pb-3 mb-4 border-bottom">КАТАЛОГ</h2>
      <nav
        class="small"
        id="toc"
        v-for="category in categorys"
        :key="category.id"
      >
        <ul class="list-unstyled">
          <li class="my-2">
            <button
              @click.prevent="filterCat(category.id)"
              type="button"
              class="btn d-inline-flex align-items-center collapsed border-0"
              data-bs-toggle="collapse"
              aria-expanded="false"
              v-bind:data-bs-target="'#' + category.id"
              aria-controls="contents-collapse"
            >
              {{ category.title }}
            </button>
            <ul class="list-unstyled ps-3 collapse" v-bind:id="category.id">
              <template
                v-for="subcategory in subcategorys"
                :key="subcategory.id"
              >
                <li v-if="subcategory.category.id == category.id">
                  <a
                    @click.prevent="filterProd(subcategory.id)"
                    class="d-inline-flex align-items-center rounded text-decoration-none"
                    v-bind:href="subcategory.title"
                    >{{ subcategory.title }}</a
                  >
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>

    <div>
      <div class="d-flex align-items-baseline bd-highlight container">
        <h1 class="text-start p-2 flex-fill bd-highlight">Товары</h1>
      </div>
      <div class="">
        <div class="d-flex flex-wrap m-3">
          <div
            class="col d-flex flex-wrap m-3"
            v-for="product in filterProducts"
            :key="product.id"
          >
            <div class="product-card">
              <div class="product-tumb">
                <img
                  v-bind:src="product.photoLink"
                  class="product-tumb-img"
                  alt="..."
                />
              </div>
              <div class="product-details">
                <span class="product-catagory">
                  {{ product.subcategory.title }}</span
                >
                <div class="cartFlex">
                  <h4 class="">
                  <a href="">{{ product.title }}</a>
                </h4>
                <div class="">
                  <p>Наличие: {{ product.inStock }}</p>
                  <div
                    class="product-bottom-details d-flex align-items-baseline"
                  >
                    <div class="product-price">{{ product.price }} руб.</div>
                    <div class="product-links" ref="datas">
                      <a
                        v-on:click="removeFromCart(product)"
                        class="btn-primary"
                        v-if="isInCart(product)"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          color="green"
                          class="bi bi-cart-check-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"
                          /></svg
                      ></a>
                      <a @click="addToCart(product)" class="btn-primary" v-else
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          color="orange"
                          class="bi bi-cart"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                          /></svg
                      ></a>
                    </div>
                  </div>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productService from "@/services/product.service";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "CatalogPage",
  data() {
    return {
      categorys: {},
      subcategorys: [],
      products: [],
      filterProducts: {},
      filterSubcategorys: [],
      cart: [],
    };
  },
  methods: {
    getCategory() {
      const $vm = this;
      productService.getCategoryAll().then(
        (response) => {
          $vm.categorys = response.data;
          console.log(this.categorys);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    getSubcategory() {
      const $vm = this;
      productService.getSubCategoryAll().then(
        (response) => {
          $vm.subcategorys = response.data;
          console.log(this.subcategorys);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    getProducts() {
      const $vm = this;
      productService.getProductAll().then(
        (response) => {
          $vm.products = response.data;
          $vm.filterProducts = response.data;
          console.log(this.products);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    filterProd(idSub) {
      this.filterProducts = this.products.filter((item) => {
        if (item.subcategory.id == idSub) {
          return item;
        }
      });
    },
    filterCat(idCat) {
      this.filterSubcategorys = this.subcategorys.filter((item) => {
        if (item.category.id == idCat) {
          return item.id;
        }
        console.log(this.filterSubcategorys);
      });
      this.filterProducts = this.products.filter((item) => {
        let item1;
        this.filterSubcategorys.forEach((element) => {
          if (element.id == item.subcategory.id) {
            item1 = item;
            return item1;
          }
        });
        return item1;
      });
      console.log(this.filterProducts);
    },
    addToCart(product) {
      product.count = 1;
      product.totalPrice = product.price;
      this.cart.push(product);
      localStorage.setItem("products", JSON.stringify(this.cart));
    },
    removeFromCart(product) {
      const index = this.cart.findIndex(({ id }) => id === product.id);
      this.cart.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(this.cart));
      console.log(this.cart);
    },
    isInCart(product) {
      if (this.cart === null) {
        this.cart = [];
        return false;
      } else {
        const cartItem = this.cart.find(({ id }) => id === product.id);
        return Boolean(cartItem);
      }
    },
    ...mapMutations(["ADD_ITEM_TO_CART"]),
    ...mapGetters(["cartItems"]),
    getCart() {
      this.cart = JSON.parse(localStorage.getItem("products"));
    },
  },

  mounted() {
    this.getCategory(),
      this.getSubcategory(),
      this.getProducts(),
      this.getCart();
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "./plugins/cheatsheet.js");
    document.head.appendChild(recaptchaScript);
    let recaptcha = document.createElement("link");
    recaptcha.setAttribute(
      "href",
      "https://getbootstrap.com/docs/5.3/examples/cheatsheet/"
    );
    recaptcha.setAttribute("rel", "canonical");
    document.head.appendChild(recaptcha);
    let recaptcha1 = document.createElement("link");
    recaptcha1.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/npm/@docsearch/css@3"
    );
    recaptcha1.setAttribute("rel", "stylesheet");
    document.head.appendChild(recaptcha1);
    let recaptcha2 = document.createElement("link");
    recaptcha2.setAttribute("href", "../assets/dist/css/bootstrap.min.css");
    recaptcha2.setAttribute("rel", "stylesheet");
    document.head.appendChild(recaptcha2);
    let recaptcha3 = document.createElement("link");
    recaptcha3.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
    );
    recaptcha3.setAttribute("rel", "stylesheet");
    document.head.appendChild(recaptcha3);
  },
};
</script>
<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.bi-cart {
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}

aside {
  background-color: #f1f1f1;
  width: 250px;
  /* padding: 1rem;
    position: fixed;
    height: 100%;
    overflow: auto; */
}

.bd-aside a {
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 0.3125rem;
  color: var(--bs-body-color);
}

.bd-aside a:hover,
.bd-aside a:focus {
  color: var(--bs-body-color);
  background-color: rgba(121, 82, 179, 0.1);
}

.bd-aside .active {
  font-weight: 600;
  color: var(--bs-body-color);
}

.bd-aside .btn {
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: var(--bs-body-color);
}

.bd-aside .btn:hover,
.bd-aside .btn:focus {
  color: var(--bs-body-color);
  background-color: rgba(121, 82, 179, 0.1);
}

.bd-aside .btn:focus {
  box-shadow: 0 0 0 1px rgba(121, 82, 179, 0.7);
}

.bd-aside .btn::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ccc' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;

  /* rtl:raw:
  transform: rotate(180deg) translateX(-2px);
  */
  transform-origin: 0.5em 50%;
}

.bd-aside .btn[aria-expanded="true"]::before {
  transform: rotate(90deg) /* rtl:ignore */;
}

/* Examples */
/* .scrollspy-example {
  height: 200px;
}

[id="modal"] .bd-example .btn,
[id="buttons"] .bd-example .btn,
[id="tooltips"] .bd-example .btn,
[id="popovers"] .bd-example .btn,
[id="dropdowns"] .bd-example .btn-group,
[id="dropdowns"] .bd-example .dropdown,
[id="dropdowns"] .bd-example .dropup,
[id="dropdowns"] .bd-example .dropend,
[id="dropdowns"] .bd-example .dropstart {
  margin: 0 1rem 1rem 0;
} */

/* Layout */
@media (min-width: 1200px) {
  /* body {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr 4fr 1fr;
    gap: 1rem;
  } */

  /* .bd-header {
    position: fixed;
    top: 0;
 
    right: 0;
    left: 0;
   
    z-index: 1030;
    grid-column: 1 / span 3;
  } */

  .bd-aside,
  /* .bd-cheatsheet {
    padding-top: 4rem;
  } */

  /**
   * 1. Too bad only Firefox supports subgrids ATM
   */
  

  .bd-aside {
    grid-area: 1 / 3;
    scroll-margin-top: 4rem;
  }
}

@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700");
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
}
a {
  text-decoration: none;
}
.product-card {
  width: 250px;
  position: relative;
  box-shadow: 0 2px 7px #dfdfdf;
  margin: 50px auto;
  background: #fafafa;
}

.badge {
  position: absolute;
  left: 0;
  top: 20px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  background: red;
  color: #fff;
  padding: 3px 10px;
}

.product-tumb {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  background: #f0f0f0;
}

.product-tumb-img {
  display: block;
  max-width: 100%;
}

.product-details {
  padding: 30px;
}

.product-catagory {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ccc;
  margin-bottom: 18px;
}

.product-details h4 a {
  font-weight: 500;
  display: block;
  margin-bottom: 18px;
  text-transform: uppercase;
  color: #363636;
  text-decoration: none;
  transition: 0.3s;
}

.product-details h4 a:hover {
  color: #fbb72c;
}

.product-details p {
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 18px;
  color: #999;
}

.product-bottom-details {
  overflow: hidden;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.product-bottom-details div {
  float: left;
  width: 50%;
}

.product-price {
  font-size: 18px;
  color: #fbb72c;
  font-weight: 600;
}

.product-price small {
  font-size: 80%;
  font-weight: 400;
  text-decoration: line-through;
  display: inline-block;
  margin-right: 5px;
}

.product-links {
  text-align: right;
}

.product-links a {
  display: inline-block;
  margin-left: 5px;
  color: #e1e1e1;
  transition: 0.3s;
  font-size: 17px;
}

.product-links a:hover {
  color: #fbb72c;
}
</style>
