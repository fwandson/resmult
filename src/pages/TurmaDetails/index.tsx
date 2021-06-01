import { Box, IconButton, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
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
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import NAMES from 'src/routes/names';
import RESOURCE_URLS from 'src/resources/names';
interface TurmaDetailsParams {
  id: string;
}

const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const history = useHistory();

  const { data: ofertasReturnData } = useApiWithSwr<GetOfertasNames.Return>({
    url: RESOURCE_URLS.GET_TURMAS_OFERTAS.replace(':id', id),
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
        <Box key="nomes" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{oferta.nome}</Typography>
        </Box>,
        <Box key="semestres" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{oferta.semestre}</Typography>
        </Box>,
        <Box key="modulos" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{oferta.modulo.nome}</Typography>
        </Box>,
        <Box key="cargahorarias" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            000
          </Typography>
          <Typography variant="caption">{`${oferta.cargahoraria} horas`}</Typography>
        </Box>,
        <Box key="actions" display="flex" justifyContent="flex-end">
          <IconButton
            onClick={() =>
              history.push(
                NAMES.FALTAS_REGISTRO.replace(':idTurma', id).replace(
                  'idOferta',
                  String(oferta.id)
                )
              )
            }
          >
            <EventAvailableIcon />
          </IconButton>
          <IconButton onClick={() => console.log('teste')}>
            <LibraryAddSharpIcon />
          </IconButton>
          <IconButton onClick={() => console.log('teste')}>
            <UpdateIcon />
          </IconButton>
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
        headCells={['Nome', 'Semestre', 'Módulo', 'CH', 'Lançamentos']}
        rows={handleRows()}
      />
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
    </GenericContent>
  );
};

export default TurmaDetails;
