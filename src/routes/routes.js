import Home from "../pages/Home";
import Login from "../pages/Auth/Login/Login";
import Logout from "../pages/Auth/Logout/Logout";
import Profile from "../pages/User/Profile/Profile";
import Transaction from "../pages/User/Transaction/Transaction";
import ProductList from "../pages/Product/List/ProductList";
import ProductDetail from "../pages/Product/Detail/Detail";
import RouteNotFound from "../pages/Error/RouteNotFound";

import { isGuest } from "../middleware/is-guest";
import { isLoggedIn } from "../middleware/is-logged-in";
import Checkout from "../pages/Checkout/Checkout";

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
    name: 'Any',
    path: '*',
    pageComponent: RouteNotFound,
    exact: false,
  }
];