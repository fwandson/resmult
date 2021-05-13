import { Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import TurmaCardInfo from 'src/components/TurmaCardInfo';
import { Container } from './styles';

const Turmas: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Turmas | Sagu</title>
      </Helmet>
      <Container>
        <Typography variant="h1" gutterBottom>
          Minhas turmas
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TurmaCardInfo
              nome="Teste"
              descricao="descrição"
              quantAlunos={10}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Turmas;
