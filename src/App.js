import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import Home from './pages/Home';
import MainLayout from './components/Layout/MainLayout';
import ProductDetail from './pages/Product/Detail/Detail';
import ProductList from './pages/Product/List/ProductList';
import { runLogoutTimer } from './stores/auth/auth-actions';

const App = () => {
  const expirationTime = useSelector(state => state.auth.expirationTime);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(runLogoutTimer(expirationTime));
  }, [dispatch, expirationTime]);

  return (
    <div className="App">
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/login" exact>
            <h1>Login Disini</h1>
          </Route>
          <Route path="/signup" exact>
            <h1>Sign up disini</h1>
          </Route>
          <Route path="/product/detail" exact>
            <ProductDetail />
          </Route>
          <Route path="*">
            <h1 className="text-center">404 Not Found</h1>
          </Route>
        </Switch>
      </MainLayout>
    </div>
  );
}

export default App;
