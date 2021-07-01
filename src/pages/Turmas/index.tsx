import { Box, Grid } from '@material-ui/core';
import EmptyContentAlert from 'src/components/EmptyContentAlert';
import GenericContent from 'src/components/GenericContent';
import TurmaCardInfo from 'src/components/TurmaCardInfo';
import useTurmas from 'src/hooks/useTurmas';

const Turmas: React.FC = () => {
  const { data: turmasData } = useTurmas();

  return (
    <GenericContent
      helmetText="Turmas | Sagu"
      title="Minhas turmas"
      isLoading={!turmasData}
      breadcrumbsLinks={[{ label: 'MINHAS TURMAS' }]}
    >
      <Box display="flex" flexDirection="column" height="100%">
        {turmasData?.turmas.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <EmptyContentAlert
              title="TurmasVazias"
              subTitle="Parece que não há turmas cadastradas em sue nome, verifique seu acesso com seu administrador."
            />
          </Box>
        )}
        <Grid container spacing={2}>
          {turmasData?.turmas.map((turma) => (
            <Grid key={turma.id} item xs={12} sm={6} md={4}>
              <TurmaCardInfo data={turma} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </GenericContent>
  );
};

export default Turmas;
