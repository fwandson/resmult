import { Box, Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import TurmaCardInfo from 'src/components/TurmaCardInfo';
import { Container } from './styles';
import { useApiWithSwr } from 'src/hooks/useApiWithSwr';
import { GetTurmasReturn } from 'src/resources/turmas/types';
import resources from 'src/resources';

const Turmas: React.FC = () => {
  const { data: turmasData } = useApiWithSwr<GetTurmasReturn>({
    url: resources.turmas.base,
  });

  return (
    <>
      <Helmet>
        <title>Turmas | Sagu</title>
      </Helmet>
      <Container>
        <Box marginBottom={4}>
          <Typography variant="h1">Minhas turmas</Typography>
        </Box>
        <Grid container spacing={2}>
          {turmasData?.turmas.map((turma) => (
            <Grid key={turma.id} item xs={12} sm={6} md={4}>
              <TurmaCardInfo
                numPeríodos={turma.quantidadeperiodo}
                numVagasOcupadas={10} // não tem essa informação na api
                id={turma.id}
                codigo={turma.codigoTurma}
                nome={turma.descricao}
                inicio={turma.dataInicio}
                fim={turma.dataFim}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Turmas;
