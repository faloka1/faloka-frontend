import { Route, Redirect } from "react-router-dom";

const defaultMiddleware = () => true;

const RouteComponent = ({ page: Page, middleware = {}, ...rest }) => {
  const { middleware: middlewareFunc = defaultMiddleware, redirectPath = '/' } = middleware;

  return (
    <Route {...rest} render={props => (
      middlewareFunc() ?
        <Page {...props} />
        : <Redirect to={redirectPath} />
    )} />
  );
};

export default RouteComponent;