import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import MainLayout from './components/Layout/MainLayout';
import { runLogoutTimer } from './stores/auth/auth-actions';
import { routes } from './routes/routes';
import RouteComponent from './routes/RouteComponent';
import { HomeContextProvider } from './context/HomeContext/HomeContext';

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
      <HomeContextProvider>
        <MainLayout>
          <Switch>
            {routes.map(route => {
              return <RouteComponent path={route.path} key={route.name} page={route.pageComponent} middleware={route.middleware} exact={route.exact} />
            })}
          </Switch>
        </MainLayout>
      </HomeContextProvider>
    </>
  );
}

export default App;
