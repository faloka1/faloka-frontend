import { Switch, Route } from 'react-router-dom';

import './App.scss';
import MainLayout from './components/Layout/MainLayout';

import Home from './pages/Home';
import ProductDetail from './pages/Product/Detail/Detail';

const App = () => {
  return (
    <div className="App">
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <h1>Login Disini</h1>
          </Route>
          <Route path="/signup" exact>
            <h1>Sign up disini</h1>
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
