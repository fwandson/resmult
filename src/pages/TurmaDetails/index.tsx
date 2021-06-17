import { Box, Typography, Tooltip, Chip } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { compareAsc, compareDesc, format } from 'date-fns';
import { toPairs } from 'lodash';
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
import useEnfases from 'src/hooks/useEnfases';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useNucleosProfissionais from 'src/hooks/useNucleosProfissionais';
import useOfertas from 'src/hooks/useOfertas';
import useTiposCargaHoraria from 'src/hooks/useTiposCargaHoraria';
import useTurmas from 'src/hooks/useTurmas';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce';
import InfoIcon from '@material-ui/icons/Info';

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

  const { findTipoCargaHoraria } = useTiposCargaHoraria();

  const { data: enfasesDataReturn } = useEnfases();

  const { data: nucleosProfissionaisDataReturn } = useNucleosProfissionais();

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosOfertasModalData>({
    periodo: '',
    inicio: undefined,
    fim: undefined,
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
      return searchOfertas(searchValueDebaunced)
        .filter((oferta) => {
          // os ids dos períodos estão como P1, P2 e P3
          if (filtros.periodo) return `P${oferta.semestre}` === filtros.periodo;
          return true;
        })
        .filter((oferta) => {
          if (filtros.inicio)
            return compareAsc(new Date(oferta.dataInicio), filtros.inicio) >= 0;
          return true;
        })
        .filter((oferta) => {
          if (filtros.fim)
            return compareDesc(new Date(oferta.dataFim), filtros.fim) >= 0;
          return true;
        })
        .map((oferta) => [
          <Box key="id" display="flex" flexDirection="column">
            <Typography variant="caption">{oferta.id}</Typography>
          </Box>,
          <Box key="oferta" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {oferta.modulo.nome}
            </Typography>

            <Typography variant="caption">{oferta.nome}</Typography>
          </Box>,
          <Box key="turma-modulo" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {oferta.turma.codigoTurma}
            </Typography>
            <Typography variant="caption">{oferta.modulo.nome}</Typography>
          </Box>,
          <Box key="periodo" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              ANO
            </Typography>
            <Typography variant="caption">
              {oferta.semestre_descricao}
            </Typography>
          </Box>,
          <Box key="inicio-fim" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {format(new Date(oferta.dataInicio), 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="caption">
              {format(new Date(oferta.dataFim), 'dd/MM/yyyy')}
            </Typography>
          </Box>,
          <Tooltip
            key="ch"
            placement="top"
            title={`${oferta.tipoCargaHoraria
              .map(
                (ch) =>
                  `${findTipoCargaHoraria({ id: ch.tipo })?.descricao}: ${
                    ch.cargahoraria
                  } horas`
              )
              .join(', ')}`}
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant="caption"
                noWrap
              >{`${oferta.cargahoraria} h`}</Typography>
              <Box m={1} />
              <InfoIcon color="action" fontSize="small" />
            </Box>
          </Tooltip>,
          <Box key="encerramento" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {oferta.encerramento ? (
                <Chip
                  label={oferta.encerramento}
                  variant="outlined"
                  color="secondary"
                />
              ) : (
                <Chip label="Aberto" variant="outlined" color="primary" />
              )}
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
              tooltipTitle="Registro de horas complementares"
              onClick={() => handlerGoToRegistroCHComp(oferta.id)}
            >
              <UpdateIcon />
            </CustonIconButton>
          </Box>,
        ]);
    }
    return [];
  };

  const handleChips = () =>
    toPairs(filtros)
      .filter((pair) => pair[1])
      .map((pair) => ({ label: pair[0], value: pair[1] }));

  return (
    <GenericContent
      helmetText="Ofertas | Sagu"
      title={'Ofertas da Turma'}
      isLoading={
        !turmasDataReturn ||
        !ofertasReturnData ||
        !enfasesDataReturn ||
        !nucleosProfissionaisDataReturn
      }
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
        title="Lista de ofertas"
        onClickFilterButton={() => setOpen(true)}
        chips={handleChips()}
        headCells={[
          {
            value: '#Id',
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
            align: 'center',
          },
          {
            value: 'Encerramento',
            align: 'center',
          },
          {
            value: 'Lançamentos',
            align: 'right',
          },
        ]}
        rows={handleRows()}
      />
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
    </GenericContent>
  );
};

export default TurmaDetails;
