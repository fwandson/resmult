import { Switch } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import RouterWithLayout from './RouterWithLayout';

const Routes = () => {
  return (
    <Switch>
      <RouterWithLayout layout={MainLayout} path="/" exact component={Login} />
      <RouterWithLayout
        layout={MainLayout}
        path="/dashboard"
        component={Dashboard}
      />
    </Switch>
  );
};

export default Routes;
