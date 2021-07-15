import { Box, Chip, Tooltip, Typography } from '@material-ui/core';
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { add, compareAsc, compareDesc, format } from 'date-fns';
import { toPairs } from 'lodash';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import CustomTable from 'src/components/CustomTable';
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
import { handlePediodo } from 'src/utils';

interface OfertasTableProps {
  turmaId: number;
  ofertas: GetOfertasNames.Return | undefined;
  searchValue: string;
}

interface Oferta {
  nome: string;
  modulo: string;
}

interface Turma {
  nome: string;
  modulo: string;
}

interface Datas {
  inicio: string;
  fim: string;
}

interface CargaHoraria {
  value: number;
  tooltipText: string;
}

interface RownsData {
  id: number;
  oferta: Oferta;
  turma: Turma;
  periodo: string;
  datas: Datas;
  ch: CargaHoraria;
  encerramento: boolean;
}

// TODO: colocar as render fn em um arquivo separado
const renderCellIdOferta = (params: GridCellParams) => (
  <Typography variant="caption">{params.value}</Typography>
);

const renderCellOferta = (params: GridCellParams) => {
  const { nome, modulo } = params.value as Oferta;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        {modulo}
      </Typography>
      <Typography variant="caption">{nome}</Typography>
    </Box>
  );
};

const renderCellTurma = (params: GridCellParams) => {
  const { nome, modulo } = params.value as Turma;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        {modulo}
      </Typography>
      <Typography variant="caption">{nome}</Typography>
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
  const { inicio, fim } = params.value as Datas;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" color="textSecondary">
        {inicio}
      </Typography>
      <Typography variant="caption">{fim}</Typography>
    </Box>
  );
};

const renderCellCh = (params: GridCellParams) => {
  const { value, tooltipText } = params.value as CargaHoraria;

  return (
    <Tooltip placement="top" title={tooltipText}>
      <Box display="flex" alignItems="center">
        <Typography variant="caption" noWrap>{`${value} h`}</Typography>
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
        <Chip label="Encerrado" variant="outlined" color="secondary" />
      ) : (
        <Chip label="Aberto" variant="outlined" color="primary" />
      )}
    </Typography>
  </Box>
);

// TODO: Será necessário passar isso para dentro do component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderCellActions = (params: GridCellParams) => (
  <Box key="lancamentos" display="flex" justifyContent="flex-end">
    <CustonIconButton
      tooltipTitle="Registro de faltas"
      // onClick={() => handlerGoToRegistroFaltas(oferta.id)}
    >
      <EventAvailableIcon />
    </CustonIconButton>
    <CustonIconButton
      tooltipTitle="Registro de notas"
      // onClick={() => handlerGoToRegistroNotas(oferta.id)}
    >
      <LibraryAddSharpIcon />
    </CustonIconButton>
    <CustonIconButton
      tooltipTitle="Registro de horas complementares"
      // onClick={() => handlerGoToRegistroCHComp(oferta.id)}
    >
      <UpdateIcon />
    </CustonIconButton>
  </Box>
);

const valueGetterAction = (params: GridValueGetterParams) =>
  params.getValue(params.id, 'id');

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#Id',
    align: 'left',
    renderCell: renderCellIdOferta,
  },
  {
    field: 'oferta',
    headerName: 'Oferta',
    align: 'left',
    width: 300,
    renderCell: renderCellOferta,
  },
  {
    field: 'turma',
    headerName: 'Turma / Modulo',
    width: 200,
    renderCell: renderCellTurma,
  },
  {
    field: 'periodo',
    headerName: 'Período',
    width: 150,
    renderCell: renderCellPeriodo,
  },
  {
    field: 'datas',
    headerName: 'Início/Fim',
    width: 150,
    sortable: false,
    renderCell: renderCellDatas,
  },
  {
    field: 'ch',
    headerName: 'CH',
    width: 150,
    renderCell: renderCellCh,
  },
  {
    field: 'encerramento',
    headerName: 'Encerramento',
    align: 'center',
    width: 200,
    renderCell: renderCellEncerramento,
  },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 200,
    valueGetter: valueGetterAction,
    renderCell: renderCellActions,
  },
];

const rows: RownsData[] = [
  {
    id: 1,
    oferta: {
      nome: 'MÓDULO TRANSVERSAL II',
      modulo: 'COLABORAÇÃO INTERPROFISSIONAL E PROCESSO DE TRABALHO NA SAÚDE',
    },
    turma: {
      nome: 'T7HOSPITALAR',
      modulo: 'MÓDULO TRANSVERSAL II',
    },
    periodo: 'Primeiro ano',
    datas: {
      inicio: '20/05/2020',
      fim: '30/06/2020',
    },
    ch: {
      value: 360,
      tooltipText: 'mensagem',
    },
    encerramento: false,
  },
  {
    id: 2,
    oferta: {
      nome: 'MÓDULO TRANSVERSAL I',
      modulo: 'TERRITÓRIO E SAÚDE',
    },
    turma: {
      nome: 'T7HOSPITALAR',
      modulo: 'MÓDULO TRANSVERSAL I',
    },
    periodo: 'Segundo ano',
    datas: {
      inicio: '20/05/2020',
      fim: '30/06/2020',
    },
    ch: {
      value: 360,
      tooltipText: 'mensagem',
    },
    encerramento: true,
  },
  {
    id: 3,
    oferta: {
      nome: 'MÓDULO TRANSVERSAL I',
      modulo: 'TERRITÓRIO E SAÚDE',
    },
    turma: {
      nome: 'T6HOSPITALAR',
      modulo: 'MÓDULO TRANSVERSAL I',
    },
    periodo: 'Segundo ano',
    datas: {
      inicio: '20/05/2020',
      fim: '30/06/2020',
    },
    ch: {
      value: 360,
      tooltipText: 'mensagem',
    },
    encerramento: true,
  },
];

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

  const handleGenerateRows = useCallback((): RownsData[] => {
    if (!ofertas) return [];

    return searchOfertas(searchValue).map((oferta) => ({
      id: oferta.id,
      oferta: {
        nome: '',
        modulo: '',
      },
      turma: {
        nome: '',
        modulo: '',
      },
      periodo: '',
      datas: {
        inicio: '',
        fim: '',
      },
      ch: {
        value: 360,
        tooltipText: 'Mensagem aqui',
      },
      encerramento: true,
    }));
  }, [ofertas, searchValue]);

  const handleRows = () => {
    if (ofertas) {
      return searchOfertas(searchValue)
        .filter((oferta) => {
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

      <CustomTable
        columns={columns}
        rows={handleGenerateRows()}
        disableSelectionOnClick
      />

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
            sorted: true,
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
        rowsData={[
          {
            idOerta: 'idOerta',
            turmaModulo: 'turmaModulo',
            periodo: 'periodo',
            ch: 'ch',
            encerramento: 'encerramento',
            lancamentos: 'lancamentos',
          },
          {
            idOerta: 'idOerta',
            turmaModulo: 'turmaModulo',
            periodo: 'periodo',
            ch: 'ch',
            encerramento: 'encerramento',
            lancamentos: 'lancamentos',
          },
          {
            idOerta: 'idOerta',
            turmaModulo: 'turmaModulo',
            periodo: 'periodo',
            ch: 'ch',
            encerramento: 'encerramento',
            lancamentos: 'lancamentos',
          },
          {
            idOerta: 'idOerta',
            turmaModulo: 'turmaModulo',
            periodo: 'periodo',
            ch: 'ch',
            encerramento: 'encerramento',
            lancamentos: 'lancamentos',
          },
        ]}
      />
    </>
  );
};

export default OfertasTable;
