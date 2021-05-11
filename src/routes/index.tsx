import { Route, Switch } from 'react-router-dom';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
