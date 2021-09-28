import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import Home from './pages/Home';
import Login from './pages/Auth/Login/Login';
import MainLayout from './components/Layout/MainLayout';
import ProductDetail from './pages/Product/Detail/Detail';
import ProductList from './pages/Product/List/ProductList';
import { runLogoutTimer } from './stores/auth/auth-actions';
import Logout from './pages/Auth/Logout/Logout';

const App = () => {
  const expirationTime = useSelector(state => state.auth.expirationTime);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expirationTime) {
      dispatch(runLogoutTimer(expirationTime));
    }
  }, [dispatch, expirationTime]);

  return (
    <>
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <h1>Register disini</h1>
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
          <Route path="/product/detail" exact>
            <ProductDetail />
          </Route>
          <Route path="*">
            <h1 className="text-center">404 Not Found</h1>
          </Route>
        </Switch>
      </MainLayout>
    </>
  );
}

export default App;
