import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import DoubleConfirmButton from '../DoubleConfirmButton';
import { Container } from './styles';

interface CHComplementarData {
  id: number;
  tipoCargaHorariaComplementar: string;
  cargaHoraria: number;
  justificativa: string;
  tipoCargaHoraria: string;
}

interface CHComplementarCardInfoProps {
  data: CHComplementarData;
}

const CHComplementarCardInfo: React.FC<CHComplementarCardInfoProps> = (
  props
) => {
  const { data } = props;

  return (
    <Container variant="outlined">
      <CardHeader
        title={<Typography variant="subtitle1">#ID: {data.id}</Typography>}
      />
      <CardContent>
        <Box>
          <Typography>
            Quantidade de horas: {data.cargaHoraria} horas
          </Typography>
          <Typography>
            Tipo CH coomplementar: {data.tipoCargaHorariaComplementar}
          </Typography>
          <Typography>Tipo da CH: {data.tipoCargaHoraria}</Typography>
          <Typography>Justificativa: {data.justificativa}</Typography>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <DoubleConfirmButton
          delay={2000}
          handleConfirm={() => console.log('handleConfirm')}
          startIcon={<DeleteIcon />}
        >
          Remover
        </DoubleConfirmButton>
        <Button startIcon={<EditIcon />}>Editar</Button>
      </CardActions>
    </Container>
  );
};

export default CHComplementarCardInfo;
