import CheckIcon from '@material-ui/icons/Check';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import TurmaInfo from 'src/components/TurmaInfo';
import { SaveButton } from './styles';

const FaltasRegistro: React.FC = () => {
  return (
    <GenericContent
      helmetText="Registro de faltas | Sagu"
      title="Registro de faltas"
      letfTitleContent={<SearchField />}
    >
      <TurmaInfo
        cod="T2HOSPITALAR"
        nome="Turma || - Hospitalar"
        inicio="20/20/2020"
        fim="20/20/2020"
      />

      <SaveButton variant="extended" color="secondary">
        <CheckIcon />
        Salvar
      </SaveButton>
    </GenericContent>
  );
};

export default FaltasRegistro;
