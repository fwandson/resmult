import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Container } from './styles';

const Turmas: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Turmas | Sagu</title>
      </Helmet>
      <Container>
        <Typography>Teste</Typography>
      </Container>
    </>
  );
};

export default Turmas;
