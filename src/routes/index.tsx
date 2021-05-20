import { Switch } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoginLaytout from 'src/layouts/LoginLaytout';
import MainLayout from 'src/layouts/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Ofertas from 'src/pages/Ofertas';
import Settings from 'src/pages/Settings';
import TurmaDetails from 'src/pages/TurmaDetails';
import Turmas from 'src/pages/Turmas';
import TypographyPage from 'src/pages/Typography';
import NAMES from './names';
import RouterWithLayout from './RouterWithLayout';

const Routes = () => {
  return (
    <Switch>
      <RouterWithLayout
        layout={LoginLaytout}
        path={NAMES.LOGIN}
        component={Login}
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.DASHBOARD}
        component={Dashboard}
        isPrivate
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.TURMAS}
        component={Turmas}
        isPrivate
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.TURMA_DETAILS}
        component={TurmaDetails}
        isPrivate
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.OFERTAS}
        component={Ofertas}
        isPrivate
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.SETTINGS}
        component={Settings}
        isPrivate
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.TYPOGRAPHY}
        component={TypographyPage}
        isPrivate
      />
      <RouterWithLayout
        layout={MainLayout}
        path={NAMES.NOT_FOUND}
        component={NotFound}
      />
    </Switch>
  );
};

export default Routes;
