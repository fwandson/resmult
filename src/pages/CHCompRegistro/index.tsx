import { Box, Hidden } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import AddCHComplementarModal from 'src/components/modals/AddCHComplementarModal';
import FiltrosResidentesModal, {
  FiltrosResidentesModalData,
} from 'src/components/modals/FiltrosResidentesModal';
import ViewCHComplementarModal from 'src/components/modals/ViewCHComplementarModal';
import OfertaInfo from 'src/components/OfertaInfo';
import SearchField from 'src/components/SearchField';
import CONSTANTS from 'src/config';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import { GetResidentesNames } from 'src/resources/turmas/types';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce/lib';
import CHCompTable from './CHCompTable';
import CHCompTableSmall from './CHCompTableSmall';

interface CHCompRegistroParams {
  idTurma: string;
  idOferta: string;
}

const CHCompRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<CHCompRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [openAddCHComplementarModal, setOpenAddCHComplementarModal] = useState(
    false
  );

  const [residenteSelectedId, setResidenteSelectedId] = useState<number>();

  const [
    openViewCHComplementarModal,
    setOpenViewCHComplementarModal,
  ] = useState(false);

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findOferta } = useOfertas({
    id: Number(idTurma),
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const {
    data: residentesDataReturn,
    mutate: residentesMutate,
    findResidente,
  } = useResidentes({
    idTurma,
    idOferta,
  });

  const {
    filtros,
    setOpen: setOpenFiltrosModal,
    ...rest
  } = useFiltrosModal<FiltrosResidentesModalData>({
    enfase: '',
  });

  const handleAddCHComplementar = useCallback(
    (residente: GetResidentesNames.Residente) => {
      setResidenteSelectedId(residente.id);
      setOpenAddCHComplementarModal(true);
    },
    []
  );

  const handleViewCHComplementar = useCallback(
    (residente: GetResidentesNames.Residente) => {
      setResidenteSelectedId(residente.id);
      setOpenViewCHComplementarModal(true);
    },
    []
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
      <Hidden smDown>
        <CHCompTable
          idTurma={idTurma}
          idOferta={idOferta}
          searchValue={searchValueDebaunced}
          filtros={filtros}
          handleAddCHComplementar={handleAddCHComplementar}
          handleViewCHComplementar={handleViewCHComplementar}
          onClickFilterButton={() => setOpenFiltrosModal(true)}
        />
      </Hidden>
      <Hidden mdUp>
        <CHCompTableSmall
          idTurma={idTurma}
          idOferta={idOferta}
          searchValue={searchValueDebaunced}
          handleAddCHComplementar={handleAddCHComplementar}
          handleViewCHComplementar={handleViewCHComplementar}
        />
      </Hidden>

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
      <AddCHComplementarModal
        idTurma={Number(idTurma)}
        idOferta={Number(idOferta)}
        open={openAddCHComplementarModal}
        setOpen={setOpenAddCHComplementarModal}
        residente={findResidente({ id: residenteSelectedId })}
        mutate={residentesMutate}
      />
      <ViewCHComplementarModal
        idTurma={Number(idTurma)}
        idOferta={Number(idOferta)}
        open={openViewCHComplementarModal}
        setOpen={setOpenViewCHComplementarModal}
        residente={findResidente({ id: residenteSelectedId })}
        mutate={residentesMutate}
      />
    </GenericContent>
  );
};

export default CHCompRegistro;
