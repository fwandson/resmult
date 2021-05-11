import { Switch } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import RouterWithLayout from './RouterWithLayout';

const Routes = () => {
  return (
    <Switch>
      <RouterWithLayout layout={MainLayout} path="/" exact component={Login} />
      <RouterWithLayout
        layout={DashboardLayout}
        path="/dashboard"
        component={Dashboard}
      />
    </Switch>
  );
};

export default Routes;
