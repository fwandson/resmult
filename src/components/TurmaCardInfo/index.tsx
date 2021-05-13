import { Button, Card, CardContent, Typography, Chip } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from 'react-feather';
import { CardActions, DatesWrapper } from './styles';

export interface TurmaCardInfoProps {
  nome: string;
  descricao: string;
  quantAlunos: number;
  inicio: string;
  fim: string;
}

// TODO: falta refinar layout desse component
const TurmaCardInfo: React.FC<TurmaCardInfoProps> = (props) => {
  const { nome, quantAlunos, descricao, inicio, fim } = props;

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
        >
          Ir para a Turma
        </Button>
      </CardActions>
    </Card>
  );
};

export default TurmaCardInfo;
