import { Box, Chip, Tooltip, Typography } from '@material-ui/core';
import { GridCellParams, GridValueGetterParams } from '@material-ui/data-grid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { add, format } from 'date-fns';
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

  const valueGetterActions = (params: GridValueGetterParams) => params.row.id;

  const valueGetterDatas = (params: GridValueGetterParams) => params.row.inicio;

  const valueGetterTurma = (params: GridValueGetterParams) => params.row.modulo;

  const renderCellIdOferta = (params: GridCellParams) => (
    <Typography variant="caption">{params.value}</Typography>
  );

  const renderCellOferta = (params: GridCellParams) => {
    const oferta = params.row.oferta;
    const modulo = params.row.modulo;

    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Typography variant="caption" color="textSecondary">
          {modulo}
        </Typography>
        <Typography variant="caption" noWrap>
          {oferta}
        </Typography>
      </Box>
    );
  };

  const renderCellTurma = (params: GridCellParams) => {
    const modulo = params.row.modulo;
    const turma = params.row.turma;

    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="caption" color="textSecondary">
          {turma}
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
          <Box m="4px" />
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
            width: 80,
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
            filterable: false,
            renderCell: renderCellTurma,
            valueGetter: valueGetterTurma,
            flex: 1,
          },
          {
            field: 'periodo',
            headerName: 'Período',
            align: 'left',
            headerAlign: 'left',
            width: 110,
            filterable: true,
            renderCell: renderCellPeriodo,
          },
          {
            field: 'datas',
            headerName: 'Início/Fim',
            align: 'center',
            headerAlign: 'center',
            type: 'date',
            width: 150,
            renderCell: renderCellDatas,
            valueGetter: valueGetterDatas,
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
            width: 160,
            sortable: false,
            filterable: false,
            valueGetter: valueGetterActions,
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
