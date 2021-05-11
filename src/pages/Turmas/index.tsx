import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Turmas: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Turmas | Sagu</title>
      </Helmet>
      <Typography variant="h1">Turmas</Typography>
    </div>
  );
};

export default Turmas;
