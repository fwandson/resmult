import { Box, Typography } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import ActionsMenu from 'src/components/ActionsMenu';
import SimpleTable from 'src/components/SimpleTable';
import useOfertas from 'src/hooks/useOfertas';
import { GetOfertasNames } from 'src/resources/turmas/types';
import NAMES from 'src/routes/names';

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

  const handleRows = () => {
    if (ofertas)
      return searchOfertas(searchValue).map((oferta) => [
        <Box key="oferta" display="flex" flexDirection="column">
          <Typography variant="caption">{oferta.nome}</Typography>
        </Box>,
        <Box key="periodo" display="flex" flexDirection="column">
          <Typography variant="caption" color="textSecondary">
            ANO
          </Typography>
          <Typography variant="caption">{oferta.semestre_descricao}</Typography>
        </Box>,
        <Box key="lancamentos" display="flex" flexDirection="column">
          <ActionsMenu
            edge="end"
            tooltipTitle="Lançamentos"
            data={[
              {
                label: 'Lançar Faltas',
                icon: <EventAvailableIcon />,
                action: () => handlerGoToRegistroFaltas(oferta.id),
              },
              {
                label: 'Lançar Notas',
                icon: <LibraryAddSharpIcon />,
                action: () => handlerGoToRegistroNotas(oferta.id),
              },
              {
                label: 'Lançar Horas compl.',
                icon: <UpdateIcon />,
                action: () => handlerGoToRegistroCHComp(oferta.id),
              },
            ]}
          />
        </Box>,
      ]);
    return [];
  };

  return (
    <SimpleTable
      title="Lista de ofertas"
      hideTablePagination
      headCells={[
        {
          value: 'Oferta',
          align: 'left',
        },
        {
          value: 'Período',
          align: 'left',
        },
        {
          value: '',
          align: 'right',
        },
      ]}
      rows={handleRows()}
    />
  );
};

export default OfertasTableSmall;
