import { Box, Typography } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import CustonIconButton from 'src/components/CustonIconButton';
import GenericContent from 'src/components/GenericContent';
import FiltrosOfertasModal, {
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import TurmaInfo from 'src/components/TurmaInfo';
import CONSTANTS from 'src/config';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useTurmas from 'src/hooks/useTurmas';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce';

interface TurmaDetailsParams {
  id: string;
}

const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findTurma, data: turmasDataReturn } = useTurmas();

  const turma = findTurma({ id: Number(id) });

  const { data: ofertasReturnData, searchOfertas } = useOfertas({
    id: Number(id),
  });

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosOfertasModalData>({
    turma: 0,
    periodo: '',
    nucleo: 0,
    enfase: 0,
    inicio: new Date(),
    fim: new Date(),
  });

  const handlerGoToRegistroFaltas = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.FALTAS_REGISTRO.replace(':idTurma', id).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [id]
  );

  const handlerGoToRegistroNotas = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.NOTAS_REGISTRO.replace(':idTurma', id).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [id]
  );

  const handlerGoToRegistroCHComp = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.CH_COMP_REGISTRO.replace(':idTurma', id).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [id]
  );

  const handleRows = () => {
    if (ofertasReturnData) {
      return searchOfertas(searchValueDebaunced).map((oferta) => [
        <Box key="ativid" display="flex" flexDirection="column">
          <Typography variant="caption">{oferta.id}</Typography>
        </Box>,
        <Box key="oferta" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            {oferta.turma.codigoTurma}
          </Typography>
          <Typography variant="caption">{oferta.nome}</Typography>
        </Box>,
        <Box key="turma-modulo" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            {oferta.turma.descricao}
          </Typography>
          <Typography variant="caption">{oferta.modulo.nome}</Typography>
        </Box>,
        <Box key="periodo" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            ANO
          </Typography>
          <Typography variant="caption">{oferta.semestre_descricao}</Typography>
        </Box>,
        <Box key="inicio-fim" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            {format(new Date(oferta.dataInicio), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="caption">
            {format(new Date(oferta.dataFim), 'dd/MM/yyyy')}
          </Typography>
        </Box>,
        <Box key="ch" display="flex" flexDirection="column">
          <Typography variant="caption">{`${oferta.cargahoraria} h`}</Typography>
        </Box>,
        <Box key="encerramento" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            {oferta.encerramento || '-'}
          </Typography>
        </Box>,
        <Box key="lancamentos" display="flex" justifyContent="flex-end">
          <CustonIconButton
            tooltipTitle="Registro de faltas"
            onClick={() => handlerGoToRegistroFaltas(oferta.id)}
          >
            <EventAvailableIcon />
          </CustonIconButton>
          <CustonIconButton
            tooltipTitle="Registro de notas"
            onClick={() => handlerGoToRegistroNotas(oferta.id)}
          >
            <LibraryAddSharpIcon />
          </CustonIconButton>
          <CustonIconButton
            tooltipTitle="Lançamento de carga horária complementar"
            onClick={() => handlerGoToRegistroCHComp(oferta.id)}
          >
            <UpdateIcon />
          </CustonIconButton>
        </Box>,
      ]);
    }
    return [];
  };

  return (
    <GenericContent
      helmetText="Ofertas | Sagu"
      title={'Ofertas da Turma'}
      isLoading={!turmasDataReturn || !ofertasReturnData}
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
    >
      <TurmaInfo
        cod={turma?.codigoTurma}
        nome={turma?.descricao}
        inicio={turma?.dataInicio}
        fim={turma?.dataFim}
      />
      <SimpleTable
        title="Ofertas"
        onClickFilterButton={() => setOpen(true)}
        headCells={[
          {
            value: 'Ativid.',
            align: 'left',
          },
          {
            value: 'Oferta',
            align: 'left',
          },
          {
            value: 'Turma / Modulo',

            align: 'left',
          },
          {
            value: 'Período',
            align: 'left',
          },
          {
            value: 'Início/Fim',
            align: 'left',
          },
          {
            value: 'CH',
            align: 'left',
          },
          {
            value: 'Encerramentos',
            align: 'left',
          },
          {
            value: 'Lançamentos',
            align: 'right',
          },
        ]}
        rows={handleRows()}
      />
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
      <pre>{JSON.stringify(filtros, null, 2)}</pre>
    </GenericContent>
  );
};

export default TurmaDetails;
