import { Box, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import { useApiWithSwr } from 'src/hooks/useApiWithSwr';
import { GetOfertasNames } from 'src/resources/turmas/types';

interface TurmaDetailsParams {
  id: string;
}

const TurmaInfo = () => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
    <Box display="flex" flexDirection="column">
      <Typography variant="body2" color="textSecondary">
        T2HOSPITALAR
      </Typography>
      <Typography variant="h6">Turma || - Hospitalar</Typography>
    </Box>
    <Box display="flex">
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" color="textSecondary">
          INÍCIO
        </Typography>
        <Typography>20/20/2020</Typography>
      </Box>
      <Box m={1} />
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" color="textSecondary">
          FIM
        </Typography>
        <Typography>21/21/2021</Typography>
      </Box>
    </Box>
  </Box>
);

const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const { data: ofertasReturnData } = useApiWithSwr<GetOfertasNames.Return>({
    url: `/residencia-multiprofissional/supervisores/turma/${id}/ofertas`,
  });

  const handleRows = () => {
    if (ofertasReturnData) {
      return ofertasReturnData.ofertasModulos.map((oferta) => [
        oferta.nome,
        oferta.semestre,
        oferta.modulo.nome,
        `${oferta.cargahoraria} horas`,
      ]);
    }
    return [];
  };

  return (
    <GenericContent
      helmetText="Ofertas | Sagu"
      title={'Ofertas da Turma'}
      letfTitleContent={<SearchField />}
    >
      <TurmaInfo />
      <SimpleTable
        title={'Ofertas'}
        headCells={['Nome', 'Semestre', 'Módulo', 'CH']}
        rows={handleRows()}
      />
      {/* <pre>{JSON.stringify(ofertasReturnData, null, 2)}</pre> */}
    </GenericContent>
  );
};

export default TurmaDetails;
