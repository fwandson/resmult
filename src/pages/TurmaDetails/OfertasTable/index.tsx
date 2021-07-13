import { Box, Chip, Tooltip, Typography } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { compareAsc, compareDesc, format, add } from 'date-fns';
import { toPairs } from 'lodash';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import CustonIconButton from 'src/components/CustonIconButton';
import FiltrosOfertasModal, {
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import SimpleTable from 'src/components/SimpleTable';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useTiposCargaHoraria from 'src/hooks/useTiposCargaHoraria';
import { GetOfertasNames } from 'src/resources/turmas/types';
import NAMES from 'src/routes/names';

interface OfertasTableProps {
  turmaId: number;
  ofertas: GetOfertasNames.Return | undefined;
  searchValue: string;
}

const OfertasTable: React.FC<OfertasTableProps> = (props) => {
  const { ofertas, turmaId, searchValue } = props;

  const history = useHistory();

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosOfertasModalData>({
    periodo: '',
    inicio: undefined,
    fim: undefined,
  });

  const { findTipoCargaHoraria } = useTiposCargaHoraria();

  const { searchOfertas } = useOfertas({
    id: turmaId,
  });

  const handlerGoToRegistroFaltas = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.FALTAS_REGISTRO.replace(':idTurma', String(turmaId)).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [turmaId]
  );

  const handlerGoToRegistroNotas = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.NOTAS_REGISTRO.replace(':idTurma', String(turmaId)).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [turmaId]
  );

  const handlerGoToRegistroCHComp = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.CH_COMP_REGISTRO.replace(':idTurma', String(turmaId)).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [turmaId]
  );

  const handlePediodo = (periodo: 'P1' | 'P2' | 'P3') => {
    const periodos = {
      P1: 'Primeiro ano',
      P2: 'Segundo ano',
      P3: 'Terceiro ano',
    };
    return periodos[periodo];
  };

  const handleChips = useCallback(() => {
    const handleValues = {
      periodo: (value: string) => handlePediodo(value as 'P1' | 'P2' | 'P3'),
      inicio: (value: string) => value,
      fim: (value: string) => value,
    };

    return toPairs(filtros)
      .filter((pair) => pair[1])
      .map((pair) => {
        const selecteFunction =
          handleValues[pair[0] as keyof FiltrosOfertasModalData];

        return {
          label: pair[0],
          value: selecteFunction(pair[1]),
        };
      });
  }, [filtros]);

  const handleRows = () => {
    if (ofertas) {
      return searchOfertas(searchValue)
        .filter((oferta) => {
          // os ids dos períodos estão como P1, P2 e P3
          if (filtros.periodo)
            return oferta.atividadeModulo.periodo === filtros.periodo;
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
              {handlePediodo(
                oferta.atividadeModulo.periodo as 'P1' | 'P2' | 'P3'
              )}
            </Typography>
          </Box>,
          <Box key="inicio-fim" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {format(
                add(new Date(oferta.dataInicio), { days: 1 }),
                'dd/MM/yyyy'
              )}
            </Typography>
            <Typography variant="caption">
              {format(add(new Date(oferta.dataFim), { days: 1 }), 'dd/MM/yyyy')}
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

  return (
    <>
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
      <SimpleTable
        title="Lista de ofertas"
        onClickFilterButton={() => setOpen(true)}
        chips={handleChips()}
        initialOrderBy="idOerta"
        headCells={[
          {
            id: 'idOerta',
            value: '#Id',
            align: 'left',
            sorted: true,
          },
          {
            id: 'oferta',
            value: 'Oferta',
            align: 'left',
            // sorted: true,
          },
          {
            id: 'turmaModulo',
            value: 'Turma / Modulo',
            align: 'left',
            sorted: true,
          },
          {
            id: 'periodo',
            value: 'Período',
            align: 'left',
            sorted: true,
          },
          {
            id: 'inicioFim',
            value: 'Início/Fim',
            align: 'left',
          },
          {
            id: 'ch',
            value: 'CH',
            align: 'center',
          },
          {
            id: 'encerramento',
            value: 'Encerramento',
            align: 'center',
          },
          {
            id: 'lancamentos',
            value: 'Lançamentos',
            align: 'right',
          },
        ]}
        rows={handleRows()}
      />
    </>
  );
};

export default OfertasTable;
