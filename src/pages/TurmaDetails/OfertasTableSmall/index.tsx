import { Box, Typography } from '@material-ui/core';
import { GridCellParams, GridValueGetterParams } from '@material-ui/data-grid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import ActionsMenu from 'src/components/ActionsMenu';
import CustomTable from 'src/components/CustomTable';
import useOfertas from 'src/hooks/useOfertas';
import { GetOfertasNames } from 'src/resources/turmas/types';
import NAMES from 'src/routes/names';
import { handlePediodo } from 'src/utils';

interface RownsData {
  id: number;
  oferta: string;
  periodo: string;
}

interface OfertasTableSmallProps {
  turmaId: number;
  ofertas: GetOfertasNames.Return | undefined;
  searchValue: string;
}

const OfertasTableSmall: React.FC<OfertasTableSmallProps> = (props) => {
  const { ofertas, turmaId, searchValue } = props;

  const history = useHistory();

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

  const rows = useMemo((): RownsData[] => {
    return searchOfertas(searchValue).map((oferta) => ({
      id: oferta.id,
      oferta: oferta.nome,
      periodo: handlePediodo(
        oferta.atividadeModulo.periodo as 'P1' | 'P2' | 'P3'
      ),
    }));
  }, [ofertas, searchValue, searchOfertas]);

  const valueGetterActions = (params: GridValueGetterParams) => params.row.id;

  const renderCellOferta = (params: GridCellParams) => (
    <Box display="flex" flexDirection="column" width="100%">
      <Typography variant="caption" noWrap>
        {params.value}
      </Typography>
    </Box>
  );

  const renderCellPeriodo = (params: GridCellParams) => (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        ANO
      </Typography>
      <Typography variant="caption">{params.value}</Typography>
    </Box>
  );

  const renderCellActions = (params: GridCellParams) => (
    <Box display="flex" flexDirection="column">
      <ActionsMenu
        edge="end"
        tooltipTitle="Lançamentos"
        data={[
          {
            label: 'Lançar Faltas',
            icon: <EventAvailableIcon />,
            action: () => handlerGoToRegistroFaltas(Number(params.value)),
          },
          {
            label: 'Lançar Notas',
            icon: <LibraryAddSharpIcon />,
            action: () => handlerGoToRegistroNotas(Number(params.value)),
          },
          {
            label: 'Lançar Horas compl.',
            icon: <UpdateIcon />,
            action: () => handlerGoToRegistroCHComp(Number(params.value)),
          },
        ]}
      />
    </Box>
  );

  return (
    <CustomTable
      title="Lista de ofertas"
      columns={[
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
          field: 'periodo',
          headerName: 'Período',
          align: 'left',
          headerAlign: 'left',
          width: 300,
          renderCell: renderCellPeriodo,
          flex: 1,
        },
        {
          field: 'actions',
          headerName: 'Ações',
          width: 75,
          align: 'center',
          headerAlign: 'center',
          filterable: false,
          sortable: false,
          renderCell: renderCellActions,
          valueGetter: valueGetterActions,
        },
      ]}
      rows={rows}
    />
  );
};

export default OfertasTableSmall;
