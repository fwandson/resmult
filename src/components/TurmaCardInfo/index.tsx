import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router';
import NAMES from 'src/routes/names';
import LabelAndInfo from '../LabelAndInfo';
import { CardActions, ChipFim, ChipInicio } from './styles';

export interface TurmaCardInfoData {
  id: number;
  codigoTurma: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  quantidadeperiodo: number;
  componente: string;
}

export interface TurmaCardInfoProps {
  data: TurmaCardInfoData;
}

const TurmaCardInfo: React.FC<TurmaCardInfoProps> = (props) => {
  const { data } = props;

  const history = useHistory();

  const handleGoToTurmaDetails = () => {
    history.push(NAMES.TURMA_DETAILS.replace(':id', String(data.id)));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {data.codigoTurma}
        </Typography>
        <Typography variant="h6" gutterBottom>
          #{data.id} - {data.descricao}
        </Typography>
        <Grid container spacing={1} component={Box} mb={2}>
          <Grid item>
            <LabelAndInfo
              label="Período de duração"
              info={`${data.quantidadeperiodo} anos`}
              color="textSecondary"
            />
          </Grid>
          <Grid item>
            <LabelAndInfo
              label="Componente"
              info={`${data.componente}`}
              color="textSecondary"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <ChipInicio
              variant="outlined"
              label={`Início: ${data.dataInicio}`}
            />
          </Grid>
          <Grid item>
            <ChipFim variant="outlined" label={`Fim: ${data.dataFim}`} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          onClick={handleGoToTurmaDetails}
        >
          Gerenciar
        </Button>
      </CardActions>
    </Card>
  );
};

export default TurmaCardInfo;
