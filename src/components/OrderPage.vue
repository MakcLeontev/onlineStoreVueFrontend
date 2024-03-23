<template>
  <div>
    <div class="container">
      <h2 class="">Оформление заказа</h2>
      <form @submit.prevent="postOrder">
        <div class="mb-3">
          <label for="title" class="form-label">Введите ФИО</label>
          <input
            v-model="order.fio"
            type="text"
            name="title"
            class="form-control"
            id="title"
          />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Введите номер телефона</label>
          <input
            v-model="order.phone"
            type="number"
            class="form-control"
            id="price"
          />
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">Адрес доставки</label>
          <input
            v-model="order.address"
            type="text"
            name="title"
            class="form-control"
            id="title"
          />
        </div>
        <div class="mb-3">
          <label for="subcategory" class="form-label">Комментарии</label>
          <input
            v-model="order.comments"
            type="text"
            name="title"
            class="form-control"
            id="title"
          />
        </div>

        <button type="submit" class="btn btn-primary">Отправить</button>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
import productService from "@/services/product.service";
export default {
  data() {
    return {
      userLoad: {},
      message: "",
      successful: false,
      products: [],
      order: {
        user: { id: 0 },
        sum: "",
        fio: "",
        phone: "",
        address: "",
        comments: "",
      },
      orderProd: {
        product: { id: 1 },
        productQuantity: "",
        order: { id: 1 },
      },
    };
  },
  methods: {
    postOrder() {
      this.message = "";
      this.successful = false;
      console.log(this.order);
      productService.postOrder(this.order).then(
        (response) => {
          console.log(response);
          this.message = response.data;
          this.successful = true;
        //   this.products.forEach((product)=> 
        //     this.orderProd.product.id = product.id
        //     this.orderProd.productQuantity = product.count
        //     this.orderProd.order.id = response.data.id


        //   )
          for (let i = 0; i < this.products.length; i++) {
            this.orderProd.product.id = this.products[i].id
            this.orderProd.productQuantity = this.products[i].count
            this.orderProd.order.id = response.data.id

            productService.postOrderProducts(this.orderProd).then(
              (response) => {
                console.log(response.data);
              },
              (error) => {
                this.message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
              }
            );
          }
          localStorage.removeItem("products");
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    //   e.preventDefault();
    },
    getProducts() {
      this.products = JSON.parse(localStorage.getItem("products"));
      console.log(this.products);
    },
    getUser() {
      this.userLoad = JSON.parse(localStorage.getItem("user"));
      this.order.user.id = this.userLoad.id;
      console.log(this.order.user.id);
    },
    getSum() {
      this.order.sum = JSON.parse(localStorage.getItem("orderSum"));
    },
  },
  mounted() {
    this.getProducts(), this.getUser(), this.getSum();
  },
};
</script>
