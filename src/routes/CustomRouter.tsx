import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from 'src/context/AuthContext';
import NAMES from 'src/routes/names';

export interface CustomRouterProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRouter: React.FC<CustomRouterProps> = (props) => {
  const { isPrivate, ...rest } = props;

  const { userLogged } = useAuth();

  // Para o caso da rota não ser privada
  if (!isPrivate) return <Route {...rest} />;

  if (!userLogged()) {
    return <Redirect to={NAMES.LOGIN} />;
  }

  // TODO: fazer implentação para o caso da rota privada
  return <Route {...rest} />;
};

export default CustomRouter;
