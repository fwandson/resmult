import {
  CardContent,
  Box,
  Typography,
  CardHeader,
  CardActions,
  Button,
} from '@material-ui/core';
import React from 'react';

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
      <CardHeader title={`#ID: ${data.id}`} />
      <CardContent>
        <Box mb={2}>
          <Typography>#ID: {data.id}</Typography>
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
      <CardActions disableSpacing>
        <Button>Remover</Button>
        <Button>Editar</Button>
      </CardActions>
    </Container>
  );
};

export default CHComplementarCardInfo;
