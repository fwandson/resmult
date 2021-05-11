import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Login: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Login | Sagu</title>
      </Helmet>
      <Typography variant="h1">Login</Typography>
    </div>
  );
};

export default Login;
