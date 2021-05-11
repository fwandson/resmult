import { Switch } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import RouterWithLayout from './RouterWithLayout';
import NAMES from './names';

const Routes = () => {
  return (
    <Switch>
      <RouterWithLayout
        layout={MainLayout}
        path={NAMES.LOGIN}
        component={Login}
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.DASHBOARD}
        component={Dashboard}
      />
    </Switch>
  );
};

export default Routes;
