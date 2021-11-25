import React from "react";

import { isGuest } from "../middleware/is-guest";
import { isLoggedIn } from "../middleware/is-logged-in";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register/Register"));
const Logout = React.lazy(() => import("../pages/Auth/Logout/Logout"));
const Profile = React.lazy(() => import("../pages/User/Profile/Profile"));
const Transaction = React.lazy(() => import("../pages/User/Transaction/Transaction"));
const ProductList = React.lazy(() => import("../pages/Product/List/ProductList"));
const ProductDetail = React.lazy(() => import("../pages/Product/Detail/Detail"));
const RouteNotFound = React.lazy(() => import("../pages/Error/RouteNotFound"));
const Checkout = React.lazy(() => import("../pages/Checkout/Checkout"));
const MixAndMatch = React.lazy(() => import("../pages/MixAndMatch/MixAndMatch"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const InspireMe = React.lazy(() => import("../pages/InspireMe/InspireMe"));

export const routes = [
  {
    name: 'Home',
    path: '/',
    pageComponent: Home,
    exact: true,
  },
  {
    name: 'Login',
    path: '/login',
    pageComponent: Login,
    middleware: {
      middleware: isGuest,
      redirectPath: '/',
    },
    exact: true,
  },
  {
    name: 'Register',
    path: '/register',
    pageComponent: Register,
    middleware: {
      middleware: isGuest,
      redirectPath: '/',
    },
    exact: true,
  },
  {
    name: 'Logout',
    path: '/logout',
    pageComponent: Logout,
    middleware: {
      middleware: isLoggedIn,
      redirectPath: '/',
    },
    exact: true,
  },
  {
    name: 'User Info',
    path: '/user/profile',
    pageComponent: Profile,
    middleware: {
      middleware: isLoggedIn,
      redirectPath: '/login',
    },
    exact: true,
  },
  {
    name: 'Transaction',
    path: '/user/transaction',
    pageComponent: Transaction,
    middleware: {
      middleware: isLoggedIn,
      redirectPath: '/login',
    },
    exact: true,
  },
  {
    name: 'Product List',
    path: '/products',
    pageComponent: ProductList,
    exact: true,
  },
  {
    name: 'Product Detail',
    path: '/products/:productSlug',
    pageComponent: ProductDetail,
    exact: true,
  },
  {
    name: 'Mix and Match',
    path: '/mix-and-match',
    pageComponent: MixAndMatch,
    exact: true,
  },
  {
    name: 'Cart',
    path: '/cart',
    pageComponent: Cart,
    exact: true,
    middleware: {
      middleware: isLoggedIn,
      redirectPath: '/login',
    },
  },
  {
    name: 'Checkout',
    path: '/checkout',
    pageComponent: Checkout,
    exact: false,
    middleware: {
      middleware: isLoggedIn,
      redirectPath: '/login',
    },
  },
  {
    name: 'Checkout',
    path: '/inspiration',
    pageComponent: InspireMe,
    exact: false,
  },
  {
    name: 'Any',
    path: '*',
    pageComponent: RouteNotFound,
    exact: false,
  }
];