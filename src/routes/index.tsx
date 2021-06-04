import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import Login from 'src/pages/Login';
import RouterWithLayout from './RouterWithLayout';
import NAMES from './names';
import NotFound from 'src/pages/NotFound';
import Turmas from 'src/pages/Turmas';
import Settings from 'src/pages/Settings';
import Ofertas from 'src/pages/Ofertas';
import TurmaDetails from 'src/pages/TurmaDetails';
import TypographyPage from 'src/pages/Typography';
import LoginLaytout from 'src/layouts/LoginLaytout';
import FaltasRegistro from 'src/pages/FaltasRegistro';
import NotasRegistro from 'src/pages/NotasRegistro';
import CHCompRegistro from 'src/pages/CHCompRegistro';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={NAMES.HOME}>
        <Redirect to={NAMES.TURMAS} />
      </Route>
      <RouterWithLayout
        layout={LoginLaytout}
        path={NAMES.LOGIN}
        component={Login}
        exact
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
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.OFERTAS}
        component={Ofertas}
        isPrivate
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.FALTAS_REGISTRO}
        component={FaltasRegistro}
        isPrivate
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.NOTAS_REGISTRO}
        component={NotasRegistro}
        isPrivate
        exact
      />
      <RouterWithLayout
        layout={DashboardLayout}
        path={NAMES.CH_COMP_REGISTRO}
        component={CHCompRegistro}
        isPrivate
        exact
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
