import {
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

export interface ViewCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
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
  const { open, setOpen, ...rest } = props;

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
      <DialogContent></DialogContent>
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
