import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ProductCart from "./components/ProductCart.vue";
import CaruselPage from "./components/CaruselPage.vue";
import HelloWorld from "./components/HelloWorld.vue";
import CatalogPage from "./components/CatalogPage.vue";
import SideBar from "./components/SideBar.vue";
import BasketPage from "./components/BasketPage.vue";
import OrderPage from "./components/OrderPage.vue";
import NotFound from './components/NotFound.vue';



// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: HelloWorld,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/createProduct",
    name: "createProduct",
    // lazy-loaded
    component: ProductCart,
  },
  {
    path: "/createCarusel",
    name: "createCarusel",
    // lazy-loaded
    component: CaruselPage,
  },
  {
    path: "/catalog",
    name: "catalog",
    // lazy-loaded
    component: CatalogPage,
  },
  {
    path: "/sidebar",
    name: "sidebar",
    // lazy-loaded
    component: SideBar,
  },
  {
    path: "/basket",
    name: "basket",
    // lazy-loaded
    component: BasketPage,
  },
  {
    path: "/order",
    name: "order",
    // lazy-loaded
    component: OrderPage,
  },
  {
    path: "/404",
    name: "notFound",
    // lazy-loaded
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home', '/catalog', '/basket'];
  const unPublicPages = ['/order'];
  const authRequired = !publicPages.includes(to.path);
  const auth2 = unPublicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn && auth2) {
    next('/login');
  } else {
    next();
  }
});

export default router;