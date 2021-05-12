import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Settings: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Settings | Sagu</title>
      </Helmet>
      <Typography variant="h1">Settings</Typography>
    </div>
  );
};

export default Settings;
