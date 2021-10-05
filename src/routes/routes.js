import Home from "../pages/Home";
import Login from "../pages/Auth/Login/Login";
import Logout from "../pages/Auth/Logout/Logout";
import ProductList from "../pages/Product/List/ProductList";
import ProductDetail from "../pages/Product/Detail/Detail";
import RouteNotFound from "../pages/Error/RouteNotFound";

import { isGuest } from "../middleware/is-guest";
import { isLoggedIn } from "../middleware/is-logged-in";

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
    name: 'Any',
    path: '*',
    pageComponent: RouteNotFound,
    exact: false,
  }
];