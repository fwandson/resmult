import { Box, Typography } from '@material-ui/core';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { uniqueId } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import CustonIconButton from 'src/components/CustonIconButton';
import GenericContent from 'src/components/GenericContent';
import FiltrosResidentesModal, {
  FiltrosResidentesModalData,
} from 'src/components/modals/FiltrosResidentesModal';
import OfertaInfo from 'src/components/OfertaInfo';
import ResidenteAvatar from 'src/components/ResidenteAvatar';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import CONSTANTS from 'src/config';
import useEnfases from 'src/hooks/useEnfases';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce/lib';

interface CHCompRegistroParams {
  idTurma: string;
  idOferta: string;
}
const CHCompRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<CHCompRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findOferta } = useOfertas({
    id: Number(idTurma),
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const { searchResidentes, data: residentesDataReturn } = useResidentes({
    idTurma,
    idOferta,
  });

  const { findEnfase, data: enfaseDataReturn } = useEnfases();

  const {
    filtros,
    setOpen: setOpenFiltrosModal,
    ...rest
  } = useFiltrosModal<FiltrosResidentesModalData>({
    enfase: '',
  });

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

  // TODO: implementar
  const handleAddCHComplementar = useCallback(() => {
    console.log('handleAddCHComplementar');
  }, []);

  // TODO: implementar
  const handleViewCHComplementar = useCallback(() => {
    console.log('handleViewCHComplementar');
  }, []);

  const handleRows = useMemo(
    () =>
      searchResidentes(searchValueDebaunced)
        .filter((residente) => {
          if (filtros.enfase)
            return residente.enfase.id === Number(filtros.enfase);
          return true;
        })
        .map((residente) => [
          <Box key={uniqueId()} p={2}>
            <ResidenteAvatar
              idTurma={Number(idTurma)}
              idOferta={Number(idOferta)}
              idResidente={residente.id}
              nomeResidente={residente.person.name[0]}
              photourl={residente.person.photourl}
            />
          </Box>,
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography>{residente.person.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              #{residente.id}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {residente.enfase.descricao}
            </Typography>
          </Box>,
          <Box key={uniqueId()} display="flex" flexDirection="column">
            <Typography
              color={
                residente.cargahorariapendente === 0 ? 'primary' : 'secondary'
              }
            >
              {residente.cargahorariapendente} horas
            </Typography>
          </Box>,
          <Box key={uniqueId()} display="flex" flexDirection="column">
            <Typography>{residente.cargahorariacomplementar.length}</Typography>
          </Box>,
          <Box key={uniqueId()} display="flex" justifyContent="flex-end">
            <CustonIconButton
              tooltipTitle="Adicionar carga horária complementar"
              onClick={() => handleAddCHComplementar()}
            >
              <AddAlarmIcon />
            </CustonIconButton>
            <CustonIconButton
              tooltipTitle="Visualizar cargas horárias complementares"
              onClick={() => handleViewCHComplementar()}
            >
              <AlarmOnIcon />
            </CustonIconButton>
          </Box>,
        ]),
    [searchValueDebaunced, residentesDataReturn, filtros.enfase]
  );

  return (
    <GenericContent
      helmetText="Carga Horária Compl. | Sagu"
      title="Registro de carga horária complementar"
      isLoading={!residentesDataReturn}
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
      breadcrumbsLinks={[
        { label: 'MINHAS TURMAS', href: NAMES.TURMAS },
        { label: 'REGISTRO CARGA HORÁRIA' },
      ]}
    >
      <OfertaInfo
        id={oferta?.id}
        cod={oferta?.turma.codigoTurma}
        nome={oferta?.nome}
        inicio={oferta?.dataInicio}
        fim={oferta?.dataFim}
        cargaHoraria={oferta?.cargahoraria}
        periodo={oferta?.semestre_descricao}
      />

      <SimpleTable
        title="Residentes"
        hideTablePagination
        onClickFilterButton={() => setOpenFiltrosModal(true)}
        chips={handleChipsTable()}
        headCells={[
          {
            value: <Typography variant="body1">Foto</Typography>,
            align: 'left',
          },
          {
            value: <Typography variant="body1">Residente / Ênfase</Typography>,
            align: 'left',
          },
          {
            value: (
              <Typography variant="body1">Carga horária pendente</Typography>
            ),
            align: 'right',
          },
          {
            value: <Typography variant="body1">Quantidade de CH</Typography>,
            align: 'right',
          },
          {
            value: <Typography variant="body1">Ações</Typography>,
            align: 'right',
          },
        ]}
        rows={handleRows}
      />

      <Box m={2} />
      <FiltrosResidentesModal
        setOpen={setOpenFiltrosModal}
        filtros={filtros}
        enfases={oferta?.atividadeModulo.enfases.map((enfase) => ({
          id: enfase.id,
          abreviatura: enfase.abreviatura,
          descricao: enfase.descricao,
        }))}
        {...rest}
      />
    </GenericContent>
  );
};

export default CHCompRegistro;
