import {
  CardContent,
  Box,
  Typography,
  CardHeader,
  CardActions,
  Button,
} from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
        <Button startIcon={<DeleteIcon />}>Remover</Button>
        <Button startIcon={<EditIcon />}>Editar</Button>
      </CardActions>
    </Container>
  );
};

export default CHComplementarCardInfo;
