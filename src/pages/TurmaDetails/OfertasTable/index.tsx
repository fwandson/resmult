import { Box, Chip, Tooltip, Typography } from '@material-ui/core';
import { GridCellParams, GridValueGetterParams } from '@material-ui/data-grid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { add, format } from 'date-fns';
// import { toPairs } from 'lodash';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import CustomTable from 'src/components/CustomTable';
import CustonIconButton from 'src/components/CustonIconButton';
import FiltrosOfertasModal, {
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useTiposCargaHoraria from 'src/hooks/useTiposCargaHoraria';
import { GetOfertasNames } from 'src/resources/turmas/types';
import NAMES from 'src/routes/names';
import { handlePediodo } from 'src/utils';

interface OfertasTableProps {
  turmaId: number;
  ofertas: GetOfertasNames.Return | undefined;
  searchValue: string;
}

// TODO: não usar objetos nos argumentos dessa interface
interface RownsData {
  id: number;
  oferta: string;
  modulo: string;
  turma: string;
  periodo: string;
  inicio: Date;
  fim: Date;
  ch: number;
  chTooltipText: string;
  encerramento: string | undefined;
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

  // TODO: passar isso pelas props
  // const handleChips = useCallback(() => {
  //   const handleValues = {
  //     periodo: (value: string) => handlePediodo(value as 'P1' | 'P2' | 'P3'),
  //     inicio: (value: string) => value,
  //     fim: (value: string) => value,
  //   };

  //   return toPairs(filtros)
  //     .filter((pair) => pair[1])
  //     .map((pair) => {
  //       const selecteFunction =
  //         handleValues[pair[0] as keyof FiltrosOfertasModalData];

  //       return {
  //         label: pair[0],
  //         value: selecteFunction(pair[1]),
  //       };
  //     });
  // }, [filtros]);

  const valueGetterAction = (params: GridValueGetterParams) =>
    params.getValue(params.id, 'id');

  const renderCellIdOferta = (params: GridCellParams) => (
    <Typography variant="caption">{params.value}</Typography>
  );

  const renderCellOferta = (params: GridCellParams) => {
    const oferta = params.row.oferta;
    const modulo = params.row.modulo;

    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="caption" color="textSecondary">
          {modulo}
        </Typography>
        <Typography variant="caption">{oferta}</Typography>
      </Box>
    );
  };

  const renderCellTurma = (params: GridCellParams) => {
    const modulo = params.row.modulo;

    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="caption" color="textSecondary">
          {modulo}
        </Typography>
        <Typography variant="caption">{modulo}</Typography>
      </Box>
    );
  };

  const renderCellPeriodo = (params: GridCellParams) => (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        ANO
      </Typography>
      <Typography variant="caption">{params.value}</Typography>
    </Box>
  );

  const renderCellDatas = (params: GridCellParams) => {
    const inicio = params.row.inicio as Date;
    const fim = params.row.fim as Date;

    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="caption" color="textSecondary">
          {format(inicio, 'dd/MM/yyyy')}
        </Typography>
        <Typography variant="caption">{format(fim, 'dd/MM/yyyy')}</Typography>
      </Box>
    );
  };

  const renderCellCh = (params: GridCellParams) => {
    const ch = params.row.ch;
    const chTooltipText = params.row.chTooltipText;

    return (
      <Tooltip placement="top" title={chTooltipText as string}>
        <Box display="flex" alignItems="center">
          <Typography variant="caption" noWrap>
            {ch} h
          </Typography>
          <Box m={1} />
          <InfoIcon color="action" fontSize="small" />
        </Box>
      </Tooltip>
    );
  };

  const renderCellEncerramento = (params: GridCellParams) => (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        {params.value ? (
          <Chip label={params.value} variant="outlined" color="secondary" />
        ) : (
          <Chip label="Aberto" variant="outlined" color="primary" />
        )}
      </Typography>
    </Box>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderCellActions = (params: GridCellParams) => (
    <Box key="lancamentos" display="flex" justifyContent="flex-end">
      <CustonIconButton
        tooltipTitle="Registro de faltas"
        onClick={() => handlerGoToRegistroFaltas(Number(params.value))}
      >
        <EventAvailableIcon />
      </CustonIconButton>
      <CustonIconButton
        tooltipTitle="Registro de notas"
        onClick={() => handlerGoToRegistroNotas(Number(params.value))}
      >
        <LibraryAddSharpIcon />
      </CustonIconButton>
      <CustonIconButton
        tooltipTitle="Registro de horas complementares"
        onClick={() => handlerGoToRegistroCHComp(Number(params.value))}
      >
        <UpdateIcon />
      </CustonIconButton>
    </Box>
  );

  const handleGenerateRows = useCallback((): RownsData[] => {
    return searchOfertas(searchValue).map((oferta) => ({
      id: oferta.id,
      oferta: oferta.nome,
      modulo: oferta.modulo.nome,
      turma: oferta.turma.codigoTurma,
      periodo: handlePediodo(
        oferta.atividadeModulo.periodo as 'P1' | 'P2' | 'P3'
      ),
      inicio: add(new Date(oferta.dataInicio), { days: 1 }),
      fim: add(new Date(oferta.dataFim), { days: 1 }),
      ch: Number(oferta.cargahoraria),
      chTooltipText: `${oferta.tipoCargaHoraria
        .map(
          (ch) =>
            `${findTipoCargaHoraria({ id: ch.tipo })?.descricao}: ${
              ch.cargahoraria
            } horas`
        )
        .join(', ')}`,
      encerramento: oferta.encerramento,
    }));
  }, [ofertas, searchValue, searchOfertas]);

  // const handleRows = () => {
  //   if (ofertas) {
  //     return searchOfertas(searchValue)
  //       .filter((oferta) => {
  //         if (filtros.periodo)
  //           return oferta.atividadeModulo.periodo === filtros.periodo;
  //         return true;
  //       })
  //       .filter((oferta) => {
  //         if (filtros.inicio)
  //           return compareAsc(new Date(oferta.dataInicio), filtros.inicio) >= 0;
  //         return true;
  //       })
  //       .filter((oferta) => {
  //         if (filtros.fim)
  //           return compareDesc(new Date(oferta.dataFim), filtros.fim) >= 0;
  //         return true;
  //       })
  //       .map((oferta) => [
  //         <Box key="id" display="flex" flexDirection="column">
  //           <Typography variant="caption">{oferta.id}</Typography>
  //         </Box>,
  //         <Box key="oferta" display="flex" flexDirection="column">
  //           <Typography variant="caption" color="textSecondary">
  //             {oferta.modulo.nome}
  //           </Typography>
  //           <Typography variant="caption">{oferta.nome}</Typography>
  //         </Box>,
  //         <Box key="turma-modulo" display="flex" flexDirection="column">
  //           <Typography variant="caption" color="textSecondary">
  //             {oferta.turma.codigoTurma}
  //           </Typography>
  //           <Typography variant="caption">{oferta.modulo.nome}</Typography>
  //         </Box>,
  //         <Box key="periodo" display="flex" flexDirection="column">
  //           <Typography variant="caption" color="textSecondary">
  //             ANO
  //           </Typography>
  //           <Typography variant="caption">
  //             {handlePediodo(
  //               oferta.atividadeModulo.periodo as 'P1' | 'P2' | 'P3'
  //             )}
  //           </Typography>
  //         </Box>,
  //         <Box key="inicio-fim" display="flex" flexDirection="column">
  //           <Typography variant="caption" color="textSecondary">
  //             {format(
  //               add(new Date(oferta.dataInicio), { days: 1 }),
  //               'dd/MM/yyyy'
  //             )}
  //           </Typography>
  //           <Typography variant="caption">
  //             {format(add(new Date(oferta.dataFim), { days: 1 }), 'dd/MM/yyyy')}
  //           </Typography>
  //         </Box>,
  //         <Tooltip
  //           key="ch"
  //           placement="top"
  //           title={`${oferta.tipoCargaHoraria
  //             .map(
  //               (ch) =>
  //                 `${findTipoCargaHoraria({ id: ch.tipo })?.descricao}: ${
  //                   ch.cargahoraria
  //                 } horas`
  //             )
  //             .join(', ')}`}
  //         >
  //           <Box display="flex" alignItems="center">
  //             <Typography
  //               variant="caption"
  //               noWrap
  //             >{`${oferta.cargahoraria} h`}</Typography>
  //             <Box m={1} />
  //             <InfoIcon color="action" fontSize="small" />
  //           </Box>
  //         </Tooltip>,
  //         <Box key="encerramento" display="flex" flexDirection="column">
  //           <Typography variant="caption" color="textSecondary">
  //             {oferta.encerramento ? (
  //               <Chip
  //                 label={oferta.encerramento}
  //                 variant="outlined"
  //                 color="secondary"
  //               />
  //             ) : (
  //               <Chip label="Aberto" variant="outlined" color="primary" />
  //             )}
  //           </Typography>
  //         </Box>,
  //         <Box key="lancamentos" display="flex" justifyContent="flex-end">
  //           <CustonIconButton
  //             tooltipTitle="Registro de faltas"
  //             onClick={() => handlerGoToRegistroFaltas(oferta.id)}
  //           >
  //             <EventAvailableIcon />
  //           </CustonIconButton>
  //           <CustonIconButton
  //             tooltipTitle="Registro de notas"
  //             onClick={() => handlerGoToRegistroNotas(oferta.id)}
  //           >
  //             <LibraryAddSharpIcon />
  //           </CustonIconButton>
  //           <CustonIconButton
  //             tooltipTitle="Registro de horas complementares"
  //             onClick={() => handlerGoToRegistroCHComp(oferta.id)}
  //           >
  //             <UpdateIcon />
  //           </CustonIconButton>
  //         </Box>,
  //       ]);
  //   }
  //   return [];
  // };

  return (
    <>
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />

      <CustomTable
        title="Lista de ofertas"
        columns={[
          {
            field: 'id',
            headerName: '#Id',
            align: 'left',
            headerAlign: 'left',
            filterable: false,
            renderCell: renderCellIdOferta,
          },
          {
            field: 'oferta',
            headerName: 'Oferta',
            align: 'left',
            headerAlign: 'left',
            width: 300,
            renderCell: renderCellOferta,
            flex: 2,
          },
          {
            field: 'turma',
            headerName: 'Turma / Modulo',
            align: 'left',
            headerAlign: 'left',
            width: 220,
            filterable: false,
            renderCell: renderCellTurma,
            flex: 1,
          },
          {
            field: 'periodo',
            headerName: 'Período',
            align: 'left',
            headerAlign: 'left',
            width: 150,
            filterable: true,
            renderCell: renderCellPeriodo,
          },
          {
            field: 'datas',
            headerName: 'Início/Fim',
            align: 'left',
            headerAlign: 'left',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: renderCellDatas,
          },
          {
            field: 'ch',
            headerName: 'CH',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            width: 100,
            filterable: false,
            renderCell: renderCellCh,
          },
          {
            field: 'encerramento',
            headerName: 'Encerramento',
            align: 'center',
            headerAlign: 'center',
            width: 180,
            renderCell: renderCellEncerramento,
          },
          {
            field: 'actions',
            headerName: 'Lançamentos',
            align: 'right',
            headerAlign: 'right',
            width: 200,
            sortable: false,
            filterable: false,
            valueGetter: valueGetterAction,
            renderCell: renderCellActions,
          },
        ]}
        rows={handleGenerateRows()}
        rowHeight={80}
      />
    </>
  );
};

export default OfertasTable;
