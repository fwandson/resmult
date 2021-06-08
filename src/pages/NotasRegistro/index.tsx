import { useState } from 'react';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import OfertaInfo from 'src/components/OfertaInfo';
import SearchField from 'src/components/SearchField';
import CONSTANTS from 'src/config';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import { useDebounce } from 'use-debounce/lib';

interface NotasRegistroParams {
  idTurma: string;
  idOferta: string;
}

const NotasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<NotasRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findOferta, data: ofertasDataReturn } = useOfertas({
    id: Number(idTurma),
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const { searchResidentes, data: residentesDataReturn } = useResidentes({
    idTurma,
    idOferta,
  });

  return (
    <GenericContent
      helmetText="Notas | Sagu"
      title="Registro de notas"
      isLoading={!residentesDataReturn || !ofertasDataReturn}
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
    >
      <OfertaInfo
        cod={oferta?.turma.codigoTurma}
        nome={oferta?.nome}
        inicio={oferta?.dataInicio}
        fim={oferta?.dataFim}
        cargaHoraria={oferta?.cargahoraria}
        periodo={oferta?.semestre_descricao}
      />
      <pre>{JSON.stringify(oferta, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          { residentes: searchResidentes(searchValueDebaunced) },
          null,
          2
        )}
      </pre>
    </GenericContent>
  );
};

export default NotasRegistro;
