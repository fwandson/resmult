import { Route, RouteProps } from 'react-router';

export interface CustomRouterProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRouter: React.FC<CustomRouterProps> = (props) => {
  const { isPrivate, ...rest } = props;

  // Para o caso da rota não ser privada
  if (!isPrivate) return <Route {...rest} />;

  // TODO: fazer implentação para o caso da rota privada
  return <Route {...rest} />;
};

export default CustomRouter;
