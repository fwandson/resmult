/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, RouteProps } from 'react-router-dom';

interface RouterWithLayoutProps extends RouteProps {
  layout: any;
  component: any;
}

const RouterWithLayout = (props: RouterWithLayoutProps) => {
  const { component: Component, layout: Layout, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouterWithLayout;
