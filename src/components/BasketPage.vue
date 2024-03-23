<template>
  <div class="container">
    <div class="shopping-cart">
      <!-- Title -->
      <div class="title">Корзина</div>

      <!-- Товар #1 -->
      <div class="item" v-for="product in products" :key="product.id">
        <div class="buttons">
          <span @click.prevent="deleteItem(product)" class="delete-btn"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
              /></svg
          ></span>
          <span class="like-btn"></span>
        </div>

        <div class="image">
          <img class="image" :src="product.photoLink" alt="" />
        </div>

        <div class="description">
          <span>{{ product.title }}</span>

          <span>Цена: {{ product.price }} руб</span>
        </div>

        <div class="quantity">
          <button
            class="plus-butn"
            type="button"
            name="button"
            @click.prevent="plus(product)"
          >
            +
          </button>
          <input type="text" name="name" :value="product.count" />
          <button
            class="minus-butn"
            type="button"
            name="button"
            @click.prevent="minus(product)"
          >
            -
          </button>
        </div>

        <div v-on="getPrice(product)" class="total-price">
          {{ getPrice(product) }} руб
        </div>
      </div>
      <div class="total">
        <div class="title">Итого</div>
        <div class="title">{{ totalPrice }} руб</div>
      </div>
      <div class="shopping-cart">
        <a href="#" @click="checkOut()" class="btn btn-primary"
          >Оформить заказ</a
        >
        <br />
        <button @click.prevent="delBasket()" class="btn btn-primary">
          Очистить корзину
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      totalMoney: 0,
      order: {},
    };
  },
  name: "BasketPage",
  computed: {
    totalPrice() {
      if (this.products === null) {
        return 0;
      }
      return this.products.reduce((acc, b) => (acc = acc + b.totalPrice), 0);
    },
  },
  methods: {
    getProducts() {
      this.products = JSON.parse(localStorage.getItem("products"));
      console.log(this.products);
    },

    showItems() {
      this.products = JSON.parse(localStorage.getItem("products"));
      console.log(this.products);
    },
    minus(product) {
      if (product.count > 0) {
        product.count--;
      }
    },
    plus(product) {
      product.count++;
    },
    delBasket() {
      localStorage.removeItem("products");
      this.products = [];
    },
    getPrice(product) {
      product.totalPrice = product.count * product.price;
      return product.totalPrice;
    },
    deleteItem(product) {
      const filter = this.products.filter((item) => item !== product);
      this.products = filter;
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    checkOut() {
      localStorage.setItem("products", JSON.stringify(this.products));
      if (this.products == null || this.products.length == 0) {
     //   localStorage.setItem("orderSum", 0);
        this.$router.push("/catalog");
      
      } else {
        localStorage.setItem(
          "orderSum",
          JSON.stringify(
            this.products.reduce((acc, b) => (acc = acc + b.totalPrice), 0)
          )
        );
        this.$router.push("/order");
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
<style>
.shopping-cart {
  width: 750px;
  /* height: 423px; */
  margin: 80px auto;
  background: #ffffff;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  display: flex;
  flex-direction: column;
}
.title {
  height: 60px;
  border-bottom: 1px solid #e1e8ee;
  padding: 20px 30px;
  color: #5e6977;
  font-size: 18px;
  font-weight: 400;
}

.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item:nth-child(3) {
  border-top: 1px solid #e1e8ee;
  border-bottom: 1px solid #e1e8ee;
}
.total {
  display: flex;
  justify-content: flex-end;
}
.buttons {
  position: relative;
  padding-top: 0px;
  margin-right: 60px;
}
.delete-butn,
.like-butn {
  display: inline-block;
  cursor: pointer;
}
.delete-butn {
  width: 18px;
  height: 17px;
  /* background: url("delete-icn.svg") no-repeat center; */
}

.like-butn {
  position: absolute;
  top: 9px;
  left: 15px;
  /* background: url('twitter-heart.png'); */
  width: 60px;
  height: 60px;
  background-size: 2900%;
  background-repeat: no-repeat;
}
.is-active {
  animation-name: animate;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
}

@keyframes animate {
  0% {
    background-position: left;
  }
  50% {
    background-position: right;
  }
  100% {
    background-position: right;
  }
}
.image {
  height: 50px;
  margin-right: 50px;
}

/* Let’s add some basic style to  product name and description. */
.description {
  padding-top: 0px;
  margin-right: 60px;
  width: 115px;
}

.description span {
  display: block;
  font-size: 14px;
  color: #43484d;
  font-weight: 400;
}

.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939e;
}
.quantity {
  padding-top: 0px;
  margin-right: 60px;
}
.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484d;
  font-weight: 300;
}

button[class*="butn"] {
  width: 30px;
  height: 30px;
  background-color: #e1e8ee;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-butn img {
  margin-bottom: 3px;
}
.plus-butn img {
  margin-top: 2px;
}

button:focus,
input:focus {
  outline: 0;
}
.total-price {
  width: 83px;

  text-align: center;
  font-size: 16px;
  color: #43484d;
  font-weight: 300;
}
@media (max-width: 800px) {
  .shopping-cart {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .item {
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .image img {
    width: 50%;
  }
  .image,
  .quantity,
  .description {
    width: 100%;
    text-align: center;
    margin: 6px 0;
  }
  .buttons {
    margin-right: 20px;
  }
}
</style>
