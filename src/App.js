import { useEffect, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import MainLayout from './components/Layout/MainLayout';
import { initAuth } from './stores/auth/auth-actions';
import { fetchItems } from './stores/cart/cart-actions';
import { routes } from './routes/routes';
import RouteComponent from './routes/RouteComponent';
import { HomeContextProvider } from './context/HomeContext/HomeContext';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchItems());
    }
  });

  return (
    <>
      <HomeContextProvider>
        <MainLayout>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              {routes.map(route => {
                return <RouteComponent path={route.path} key={route.name} page={route.pageComponent} middleware={route.middleware} exact={route.exact} />
              })}
            </Switch>
          </Suspense>
        </MainLayout>
      </HomeContextProvider>
    </>
  );
}

export default App;
