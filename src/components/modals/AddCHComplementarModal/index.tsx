import {
  DialogProps,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export interface AddCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddCHComplementarModal: React.FC<AddCHComplementarModalProps> = (
  props
) => {
  const { open, setOpen, ...rest } = props;

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">Filtros</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5">Teste</Typography>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between">
          <Button>Limpar</Button>
          <Button color="secondary" startIcon={<CheckIcon />}>
            Aplicar filtros
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddCHComplementarModal;
