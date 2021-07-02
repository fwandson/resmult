import { Button, Card, CardContent, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router';
import NAMES from 'src/routes/names';
import LabelAndInfo from '../LabelAndInfo';
import {
  CardActions,
  ChipFim,
  ChipInicio,
  DatesWrapper,
  InfoWrapper,
} from './styles';

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
        <InfoWrapper>
          <LabelAndInfo
            label="Período de duração"
            info={`${data.quantidadeperiodo} anos`}
            color="textSecondary"
          />
          <LabelAndInfo
            label="Componente"
            info={String(data.componente)}
            color="textSecondary"
          />
        </InfoWrapper>
        <DatesWrapper>
          <ChipInicio variant="outlined" label={`Início: ${data.dataInicio}`} />
          <ChipFim variant="outlined" label={`Fim: ${data.dataFim}`} />
        </DatesWrapper>
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
