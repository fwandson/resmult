import { Box, Typography } from '@material-ui/core';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { reduce } from 'lodash';
import { useMemo } from 'react';
import ActionsMenu from 'src/components/ActionsMenu';
import ResidenteInfo from 'src/components/ResidenteInfo';
import SimpleTable from 'src/components/SimpleTable';
import useResidentes from 'src/hooks/useResidentes';
import { GetResidentesNames } from 'src/resources/turmas/types';

export interface CHCompTableSmallProps {
  idTurma: number | string;
  idOferta: number | string;
  searchValue: string;
  handleAddCHComplementar: (residente: GetResidentesNames.Residente) => void;
  handleViewCHComplementar: (residente: GetResidentesNames.Residente) => void;
}

const CHCompTableSmall: React.FC<CHCompTableSmallProps> = (props) => {
  const {
    idTurma,
    idOferta,
    searchValue,
    handleAddCHComplementar,
    handleViewCHComplementar,
  } = props;

  const { searchResidentes, data: residentesDataReturn } = useResidentes({
    idTurma,
    idOferta,
  });

  const handleRows = useMemo(
    () =>
      searchResidentes(searchValue).map((residente) => [
        <ResidenteInfo
          key="residente"
          data={{
            id: residente.id,
            name: residente.person.name,
            enfase: residente.enfase.descricao,
          }}
        />,
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
          <ActionsMenu
            edge="end"
            tooltipTitle="Ações"
            data={[
              {
                label: 'Adicionar nova CH',
                icon: <AddAlarmIcon />,
                action: () => handleAddCHComplementar(residente),
              },
              {
                label: 'Ver CH registradas',
                icon: <AlarmOnIcon />,
                action: () => handleViewCHComplementar(residente),
              },
            ]}
          />
        </Box>,
      ]),
    [searchValue, residentesDataReturn]
  );

  return (
    <SimpleTable
      title="Residentes"
      hideTablePagination
      initialOrderBy="residente"
      headCells={[
        {
          id: 'residente',
          value: 'Residente / Ênfase',
          align: 'left',
        },
        {
          id: 'chRegistrada',
          value: 'CH registrada',
          align: 'left',
        },
        {
          id: 'actions',
          value: 'Ações',
          align: 'right',
        },
      ]}
      rows={handleRows}
    />
  );
};

export default CHCompTableSmall;
