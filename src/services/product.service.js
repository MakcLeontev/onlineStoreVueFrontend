import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8282/';

class ProductService {
  // { headers: authHeader() },
  //   postProduct(data) {
  //     return axios.post(API_URL + 'product' , data, { headers: authHeader() },);
  //   }
  
  //   getCategoryAll() {
  //     return axios.get(API_URL + 'category/all', { headers: authHeader() });
  //   }
  
  //   getSubCategoryAll() {
  //     return axios.get(API_URL + 'subcategory/all', { headers: authHeader() });
  //   }
  
  //   getManufacturerAll() {
  //     return axios.get(API_URL + 'manufacturer/all', { headers: authHeader() });
  //   }
  // }
  postProduct(data) {
    return axios.post(API_URL + 'product' , data, { headers: authHeader() });
  }

  getCategoryAll() {
    return axios.get(API_URL + 'category/all');
  }

  getSubCategoryAll() {
    return axios.get(API_URL + 'subcategory/all');
  }

  getManufacturerAll() {
    return axios.get(API_URL + 'manufacturer/all');
  }

  getProductAll() {
    return axios.get(API_URL + 'product/all');
  }

  postPhoto(data) {
    return axios.post(API_URL + 'photo', data);
  }
  postManufacturer(data) {
    return axios.post(API_URL + 'manufacturer', data, { headers: authHeader() });
  }
  postCategory(data) {
    return axios.post(API_URL + 'category', data, { headers: authHeader() });
  }
  postSubcategory(data) {
    return axios.post(API_URL + 'subcategory', data, { headers: authHeader() });
  }
  postOrder(data) {
    return axios.post(API_URL + 'order', data, { headers: authHeader() });
  }
  postOrderProducts(data) {
    return axios.post(API_URL + 'orderproduct', data, { headers: authHeader() });
  }
  // putOrder(id,data) {
  //   return axios.put(API_URL + 'order', id, data);
  // }
}
  
  export default new ProductService();