import { Switch, Route } from 'react-router-dom';

import './App.scss';
import MainLayout from './components/Layout/MainLayout';

import Home from './pages/Home';
import Login from './pages/Auth/Login/Login';
import ProductDetail from './pages/Product/Detail/Detail';
import ProductList from './pages/Product/List/ProductList';

const App = () => {
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
            <Login />
          </Route>
          <Route path="/register" exact>
            <h1>Register disini</h1>
          </Route>
          <Route path="/product/detail" exact>
            <ProductDetail/>
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
