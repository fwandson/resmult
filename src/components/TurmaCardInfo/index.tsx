import { Button, Card, CardContent, Typography, Chip } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from 'react-feather';
import { useHistory } from 'react-router';
import NAMES from 'src/routes/names';
import { CardActions, DatesWrapper } from './styles';

export interface TurmaCardInfoProps {
  id: number;
  nome: string;
  descricao: string;
  quantAlunos: number;
  inicio: string;
  fim: string;
}

// TODO: falta refinar layout desse component
const TurmaCardInfo: React.FC<TurmaCardInfoProps> = (props) => {
  const { id, nome, quantAlunos, descricao, inicio, fim } = props;

  const history = useHistory();

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h3" color="initial" gutterBottom>
          {nome}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {descricao}
        </Typography>
        <Typography gutterBottom>
          Quantidade de alunos: {quantAlunos}
        </Typography>
        <DatesWrapper>
          <Chip
            variant="outlined"
            color="primary"
            label={`Início: ${inicio}`}
          />
          <Chip variant="outlined" color="secondary" label={`Fim: ${fim}`} />
        </DatesWrapper>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon size={16} />}
          onClick={() =>
            history.push(NAMES.TURMA_DETAILS.replace(':id', String(id)))
          }
        >
          Gerenciar
        </Button>
      </CardActions>
    </Card>
  );
};

export default TurmaCardInfo;
