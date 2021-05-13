import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from 'react-feather';
import { CardActions } from './styles';

export interface TurmaCardInfoProps {
  nome: string;
  descricao: string;
  quantAlunos: number;
}

// TODO: falta refinar layout desse component
const TurmaCardInfo: React.FC<TurmaCardInfoProps> = (props) => {
  const { nome, quantAlunos, descricao } = props;

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography gutterBottom>{nome}</Typography>
        <Typography variant="subtitle2" gutterBottom>
          {descricao}
        </Typography>
        <Typography>Quantidade de alunos: {quantAlunos}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon size={16} />}
        >
          Ir para a Turma
        </Button>
      </CardActions>
    </Card>
  );
};

export default TurmaCardInfo;
