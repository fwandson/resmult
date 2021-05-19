/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomRouter, { CustomRouterProps } from './CustomRouter';

interface RouterWithLayoutProps extends CustomRouterProps {
  layout: any;
  component: any;
}

const RouterWithLayout = (props: RouterWithLayoutProps) => {
  const { component: Component, layout: Layout, ...rest } = props;

  return (
    <CustomRouter
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
