import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Sagu</title>
      </Helmet>
      <Typography variant="h1">Dashboard</Typography>
    </div>
  );
};

export default Dashboard;
