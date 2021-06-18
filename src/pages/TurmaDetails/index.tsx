import { Box, Hidden } from '@material-ui/core';
import { useState } from 'react';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import TurmaInfo from 'src/components/TurmaInfo';
import CONSTANTS from 'src/config';
import useEnfases from 'src/hooks/useEnfases';
import useNucleosProfissionais from 'src/hooks/useNucleosProfissionais';
import useOfertas from 'src/hooks/useOfertas';
import useTurmas from 'src/hooks/useTurmas';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce';
import OfertasTable from './OfertasTable';
import OfertasTableSmall from './OfertasTableSmall';
interface TurmaDetailsParams {
  id: string;
}

const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findTurma, data: turmasDataReturn } = useTurmas();

  const turma = findTurma({ id: Number(id) });

  const { data: ofertasReturnData } = useOfertas({
    id: Number(id),
  });

  const { data: enfasesDataReturn } = useEnfases();

  const { data: nucleosProfissionaisDataReturn } = useNucleosProfissionais();

  return (
    <GenericContent
      helmetText="Ofertas | Sagu"
      title={'Ofertas da Turma'}
      isLoading={
        !turmasDataReturn ||
        !ofertasReturnData ||
        !enfasesDataReturn ||
        !nucleosProfissionaisDataReturn
      }
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
      breadcrumbsLinks={[{ label: 'Home', href: NAMES.HOME }]}
    >
      <TurmaInfo
        cod={turma?.codigoTurma}
        nome={turma?.descricao}
        inicio={turma?.dataInicio}
        fim={turma?.dataFim}
      />
      <Hidden smDown>
        <OfertasTable
          turmaId={Number(id)}
          ofertas={ofertasReturnData}
          searchValue={searchValueDebaunced}
        />
      </Hidden>
      <Hidden mdUp>
        <OfertasTableSmall
          turmaId={Number(id)}
          ofertas={ofertasReturnData}
          searchValue={searchValueDebaunced}
        />
      </Hidden>
      <Box m={2} />
    </GenericContent>
  );
};

export default TurmaDetails;
