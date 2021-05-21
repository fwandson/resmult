import { Grid, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import TurmaCardInfo from 'src/components/TurmaCardInfo';
import { Container } from './styles';
import { useApiWithSwr } from 'src/hooks/useApiWithSwr';
import { GetTurmasReturn } from 'src/resources/turmas/types';

const Turmas: React.FC = () => {
  const { data: turmasData } = useApiWithSwr<GetTurmasReturn>({
    url: '/residencia-multiprofissional/supervisores/turmas',
  });

  return (
    <>
      <Helmet>
        <title>Turmas | Sagu</title>
      </Helmet>
      <Container>
        <Typography variant="h1" gutterBottom>
          Minhas turmas
        </Typography>
        <Grid container spacing={2}>
          {turmasData?.turmas.map((turma) => (
            <Grid key={turma.id} item xs={12} sm={4}>
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
        <pre>{JSON.stringify(turmasData, null, 2)}</pre>
      </Container>
    </>
  );
};

export default Turmas;
