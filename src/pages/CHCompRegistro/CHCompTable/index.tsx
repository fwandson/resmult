import { Typography, Box } from '@material-ui/core';
import { find, reduce } from 'lodash';
import { useCallback, useMemo } from 'react';
import CHPendentesInfo from 'src/components/CHPendentesInfo';
import CustonIconButton from 'src/components/CustonIconButton';
import ResidenteAvatar from 'src/components/ResidenteAvatar';
import ResidenteInfo from 'src/components/ResidenteInfo';
import SimpleTable from 'src/components/SimpleTable';
import useResidentes from 'src/hooks/useResidentes';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { FiltrosResidentesModalData } from 'src/components/modals/FiltrosResidentesModal';
import { GetResidentesNames } from 'src/resources/turmas/types';
import useEnfases from 'src/hooks/useEnfases';

export interface CHCompTableProps {
  idTurma: number | string;
  idOferta: number | string;
  searchValue: string;
  filtros: FiltrosResidentesModalData;
  handleAddCHComplementar: (residente: GetResidentesNames.Residente) => void;
  handleViewCHComplementar: (residente: GetResidentesNames.Residente) => void;
  onClickFilterButton: () => void;
}

const CHCompTable: React.FC<CHCompTableProps> = (props) => {
  const {
    idTurma,
    idOferta,
    searchValue,
    filtros,
    handleAddCHComplementar,
    handleViewCHComplementar,
    onClickFilterButton,
  } = props;

  const { searchResidentes, data: residentesDataReturn } = useResidentes({
    idTurma,
    idOferta,
  });

  const { findEnfase, data: enfaseDataReturn } = useEnfases();

  const handleChipsTable = useCallback(() => {
    if (filtros.enfase)
      return [
        {
          label: 'Ênfase',
          value: findEnfase({ id: Number(filtros.enfase) })?.descricao || '',
        },
      ];
    return [];
  }, [filtros, enfaseDataReturn]);

  const handleRows = useMemo(
    () =>
      searchResidentes(searchValue)
        .filter((residente) => {
          if (filtros.enfase)
            return residente.enfase.id === Number(filtros.enfase);
          return true;
        })
        .map((residente) => [
          <Box
            key="foto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <ResidenteAvatar
              idTurma={Number(idTurma)}
              idOferta={Number(idOferta)}
              idResidente={residente.id}
              nomeResidente={residente.person.name[0]}
              photourl={residente.person.photourl}
            />
          </Box>,
          <ResidenteInfo
            key="residente"
            data={{
              id: residente.id,
              name: residente.person.name,
              enfase: residente.enfase.descricao,
            }}
          />,
          <Box
            key="chPendente"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <CHPendentesInfo
              data={{
                pratica: find(residente?.cargaHorariaPendente, { tipo: 'P' })
                  ?.cargaHorariaPendente,
                teoricoPratica: find(residente?.cargaHorariaPendente, {
                  tipo: 'T',
                })?.cargaHorariaPendente,
                teoricoConceitual: find(residente?.cargaHorariaPendente, {
                  tipo: 'C',
                })?.cargaHorariaPendente,
              }}
            />
          </Box>,
          <Box key="chRegistradas" display="flex" flexDirection="column">
            <Typography variant="body1">
              {residente.cargahorariacomplementar.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {reduce(
                residente?.cargahorariacomplementar,
                (sum, elem) => sum + Number(elem.cargaHoraria),
                0
              )}{' '}
              h
            </Typography>
          </Box>,
          <Box key="actions" display="flex" justifyContent="flex-end">
            <CustonIconButton
              tooltipTitle="Adicionar carga horária complementar"
              onClick={() => handleAddCHComplementar(residente)}
            >
              <AddAlarmIcon />
            </CustonIconButton>
            <CustonIconButton
              tooltipTitle="Visualizar cargas horárias complementares"
              onClick={() => handleViewCHComplementar(residente)}
            >
              <AlarmOnIcon />
            </CustonIconButton>
          </Box>,
        ]),
    [searchValue, residentesDataReturn, filtros.enfase]
  );

  return (
    <SimpleTable
      title="Residentes"
      hideTablePagination
      onClickFilterButton={onClickFilterButton}
      chips={handleChipsTable()}
      initialOrderBy="residente"
      headCells={[
        {
          id: 'foto',
          value: <Typography variant="body1">Foto</Typography>,
          align: 'center',
        },
        {
          id: 'residente',
          value: <Typography variant="body1">Residente / Ênfase</Typography>,
          align: 'left',
        },
        {
          id: 'chPendente',
          value: <Typography variant="body1">CH pendente</Typography>,
          align: 'left',
        },
        {
          id: 'chRegistrada',
          value: <Typography variant="body1">CH registrada</Typography>,
          align: 'right',
        },
        {
          id: 'actions',
          value: <Typography variant="body1">Ações</Typography>,
          align: 'right',
        },
      ]}
      rows={handleRows}
    />
  );
};

export default CHCompTable;
