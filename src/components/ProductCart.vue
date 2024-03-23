<template>
  <div>
    <div class="container">
      <h2>Карточка товара</h2>
    <form @submit.prevent="postData">
      <div class="mb-3">
        <label for="title" class="form-label"
          >Введите наименование товара</label
        >
        <input
          type="text"
          name="title"
          class="form-control"
          id="title"
          v-model="product.title"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Цена</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="product.price"
        />
      </div>

      <div class="mb-3" @click="getCategory">
        <label for="category" class="form-label">Категория товара</label>
        <select
          class="form-control"
          aria-label="Пример выбора по умолчанию"
          id="category"
          v-model="product.category.id"
        >
          <option
            v-for="category in categorys"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <div class="mb-3" @click="getSubcategory">
        <label for="subcategory" class="form-label">Подкатегория</label>
        <select
          class="form-control"
          aria-label="Пример выбора по умолчанию"
          id="subcategory"
          v-model="product.subcategory.id"
        >
          <option
            v-for="subcategory in subcategorys"
            :key="subcategory.id"
            :value="subcategory.id"
          >
            {{ subcategory.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="inStock" class="form-label">Количество</label>
        <input
          type="number"
          class="form-control"
          id="inStock"
          v-model="product.inStock"
        />
      </div>
      <div class="mb-3" @click="getManufacturer">
        <label for="manufacturer" class="form-label">Производитель</label>
        <select
          class="form-control"
          aria-label="Пример выбора по умолчанию"
          id="manufacturer"
          v-model="product.manufacturer.id"
        >
          <option
            v-for="manufacturer in manufacturers"
            :key="manufacturer.id"
            :value="manufacturer.id"
          >
            {{ manufacturer.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="fotoLink" class="form-label">Ссылка на фото </label>
        <input
          type="text"
          class="form-control"
          id="fotoLink"
          v-model="product.photoLink"
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

    <h2>Внести в БД нового производителя</h2>
    <form @submit.prevent="saveManufacturer">
      <div class="mb-3">
        <label for="manufacturer" class="form-label">
          Введите наименование производителя
        </label>
        <input
          type="text"
          class="form-control"
          id="manufacturer"
          v-model="manufacturer.title"
        />
      </div>
      <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
    <div
      v-if="messageManufacturer"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ messageManufacturer }}
    </div>
    <h2>Внести в БД новую категорию</h2>
    <form @submit.prevent="saveCategory">
      <div class="mb-3">
        <label for="category" class="form-label">
          Введите наименование категории
        </label>
        <input
          type="text"
          class="form-control"
          id="category"
          v-model="category.title"
        />
      </div>
      <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
    <div
      v-if="messageCategory"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ messageCategory }}
    </div>
    <h2>Внести в БД новую подкатегорию</h2>
    <form @submit.prevent="saveSubcategory">
      <div class="mb-3" @click="getCategory">
        <label for="category" class="form-label">Категория товара</label>
        <select
          class="form-control"
          aria-label="Пример выбора по умолчанию"
          id="category"
          v-model="subcategory.category.id"
        >
          <option
            v-for="category in categorys"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="subCategory" class="form-label">
          Введите наименование подкатегории
        </label>
        <input
          type="text"
          class="form-control"
          id="subCategory"
          v-model="subcategory.title"
        />
      </div>
      <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
    <div
      v-if="messageSubcategory"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ messageSubcategory }}
    </div>
    </div>
  </div>
</template>
<script>
import productService from "@/services/product.service";
// import axios from "axios";
// import { error } from "jquery";
export default {
  name: "ProductCard",
  title: {},
  data() {
    return {
      content: {},
      categorys: {},
      category: {
        title: "",
      },
      subcategorys: {},
      subcategory: {
        title: "",
        category: { id: 1 },
      },
      manufacturers: {},
      manufacturer: {
        title: "",
      },
      // titleManufacturer:'',
      successful: false,
      message: "",
      messageManufacturer: "",
      messageCategory: "",
      messageSubcategory: "",
      fotoLink:"",
      // fotoLink: {
      //   product: { id: 1 },
      //   photoLink: "",
      //   photoIsMain: true,
      // },
      product: {
        title: "",
        price: "",
        category: { id: 1 },
        subcategory: { id: 1 },
        inStock: "",
        manufacturer: { id: 1 },
        photoLink:"",
        count: 1,
      },
    };
  },
  methods: {
    postData(e) {
      this.message = "";
      this.successful = false;
      productService.postProduct(this.product).then(
        (response) => {
          console.log(response);
          this.content = response.data;
          // this.fotoLink.product.id = response.data.id;
          this.message = response.data;
          this.successful = true;
          // productService.postPhoto(this.fotoLink).then(
          //   (response) => {
          //     console.log(response.data);
          //   },
          //   (error) => {
          //     this.message =
          //       (error.response &&
          //         error.response.data &&
          //         error.response.data.message) ||
          //       error.message ||
          //       error.toString();
          //   }
          // );
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
      e.preventDefault();
    },
    saveManufacturer() {
      const $vm = this;
      this.messageManufacturer = "";
      this.successful = false;
      console.log(this.manufacturer);
      productService.postManufacturer(this.manufacturer).then(
        (response) => {
          $vm.manufacturer = response.data;
          this.messageManufacturer = response.data;
          this.successful = true;
        },
        (error) => {
          this.messageManufacturer =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    saveCategory() {
      this.messageCategory = "";
      this.successful = false;
      console.log(this.category);
      productService.postCategory(this.category).then(
        (response) => {
          this.messageCategory = response.data;
          this.successful = true;
        },
        (error) => {
          this.messageCategory =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    saveSubcategory() {
      this.messageSubcategory = "";
      this.successful = false;
      console.log(this.subcategory);
      productService.postSubcategory(this.subcategory).then(
        (response) => {
          this.messageSubcategory = response.data;
          this.successful = true;
        },
        (error) => {
          this.messageSubcategory =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
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
    getManufacturer() {
      const $vm = this;
      productService.getManufacturerAll().then(
        (response) => {
          $vm.manufacturers = response.data;
          console.log(this.manufacturers);
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
  },

  // mounted() {
  //   this.getCategory(), this.getSubcategory(), this.getManufacturer();
  // },
};
</script>
<style></style>
