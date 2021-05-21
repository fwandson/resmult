import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from 'react-feather';
import { useHistory } from 'react-router';
import NAMES from 'src/routes/names';
import {
  CardActions,
  ChipFim,
  ChipInicio,
  DatesWrapper,
  InfoWrapper,
} from './styles';

export interface TurmaCardInfoProps {
  id: number;
  codigo: string;
  nome: string;
  inicio: string;
  fim: string;
  numPeríodos: number;
  numVagasOcupadas: number;
}

const TurmaCardInfo: React.FC<TurmaCardInfoProps> = (props) => {
  const { id, nome, codigo, inicio, fim, numPeríodos, numVagasOcupadas } =
    props;

  const history = useHistory();

  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {codigo}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {nome}
        </Typography>
        <InfoWrapper>
          <Typography variant="body2" color="textSecondary">
            Período de duração: {numPeríodos}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Vagas ocupadas: {numVagasOcupadas}
          </Typography>
        </InfoWrapper>
        <DatesWrapper>
          <ChipInicio
            variant="outlined"
            color="primary"
            label={`Início: ${inicio}`}
          />
          <ChipFim variant="outlined" color="secondary" label={`Fim: ${fim}`} />
        </DatesWrapper>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          color="secondary"
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
