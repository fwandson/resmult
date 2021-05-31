import { Box, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import FiltrosOfertasModal, {
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import TurmaInfo from 'src/components/TurmaInfo';
import { useApiWithSwr } from 'src/hooks/useApiWithSwr';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import { GetOfertasNames } from 'src/resources/turmas/types';

interface TurmaDetailsParams {
  id: string;
}

const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const { data: ofertasReturnData } = useApiWithSwr<GetOfertasNames.Return>({
    url: `/residencia-multiprofissional/supervisores/turma/${id}/ofertas`,
  });

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosOfertasModalData>({
    turma: 0,
    periodo: 0,
    nucleo: 0,
    enfase: 0,
    inicio: new Date(),
    fim: new Date(),
  });

  const handleRows = () => {
    if (ofertasReturnData) {
      return ofertasReturnData.ofertasModulos.map((oferta) => [
        <Box key="nome" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{oferta.nome}</Typography>
        </Box>,
        <Box key="semestre" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{oferta.semestre}</Typography>
        </Box>,
        <Box key="modulo" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{oferta.modulo.nome}</Typography>
        </Box>,
        <Box key="cargahoraria" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{`${oferta.cargahoraria} horas`}</Typography>
        </Box>,
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
      <TurmaInfo
        cod="T2HOSPITALAR"
        nome="Turma || - Hospitalar"
        inicio="20/20/2020"
        fim="20/20/2020"
      />
      <SimpleTable
        title={'Ofertas'}
        onClickFilterButton={() => setOpen(true)}
        headCells={['Nome', 'Semestre', 'Módulo', 'CH']}
        rows={handleRows()}
      />
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
    </GenericContent>
  );
};

export default TurmaDetails;
