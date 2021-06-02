/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import TurmaInfo from 'src/components/TurmaInfo';
import useTurmas from 'src/hooks/useTurmas';
import { useDebounce } from 'use-debounce/lib';

interface NotasRegistroParams {
  idTurma: string;
  idOferta: string;
}

const NotasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<NotasRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(searchValue, 1000);

  const { data: turmasDataReturn } = useTurmas();

  const turma = turmasDataReturn?.turmas.find(
    (elem) => elem.id === Number(idTurma)
  );

  return (
    <GenericContent
      helmetText="Notas | Sagu"
      title="Registro de notas"
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
    >
      <TurmaInfo
        cod={turma?.codigoTurma}
        nome={turma?.descricao}
        inicio={turma?.dataInicio}
        fim={turma?.dataFim}
      />
    </GenericContent>
  );
};

export default NotasRegistro;
