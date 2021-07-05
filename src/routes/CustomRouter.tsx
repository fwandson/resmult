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

  // Caso o usuário não esteja logado
  if (!userLogged()) {
    return <Redirect to={NAMES.LOGIN} />;
  }

  return <Route {...rest} />;
};

export default CustomRouter;
