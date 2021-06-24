import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Dispatch, SetStateAction } from 'react';
import { GetResidentesNames } from 'src/resources/turmas/types';
import { reduce } from 'lodash';
import CHComplementarCardInfo from 'src/components/CHComplementarCardInfo';

export interface ViewCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  residente: GetResidentesNames.Residente | undefined;
}

export interface ViewCHComplementarModalFormData {
  chComplementar: number;
  tipoCh: number;
  tipoChComplementar: number;
  descricao: string;
}

const ViewCHComplementarModal: React.FC<ViewCHComplementarModalProps> = (
  props
) => {
  const { open, setOpen, residente, ...rest } = props;

  const totalCHComplementates = reduce(
    residente?.cargahorariacomplementar,
    (sum, elem) => sum + Number(elem.cargaHoraria),
    0
  );

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">Cargas horárias complementares</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography gutterBottom>
            Residente: {residente?.person.name}
          </Typography>
          <Typography gutterBottom>
            Carga horária pendente: {residente?.cargahorariapendente} horas
          </Typography>
        </Box>
        {residente?.cargahorariacomplementar.map((elem) => (
          <CHComplementarCardInfo
            key={elem.id}
            data={{
              id: elem.id,
              cargaHoraria: Number(elem.cargaHoraria),
              tipoCargaHoraria: elem.tipoCargaHoraria,
              tipoCargaHorariaComplementar:
                elem.tipoCargaHorariaComplementar.descricao,
              justificativa: elem.justificativa,
            }}
          />
        ))}
        <Box mt={2}>
          <Typography>
            Total de horas de CH complementares: {totalCHComplementates} horas
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            startIcon={<CheckIcon />}
          >
            Confirmar
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCHComplementarModal;
