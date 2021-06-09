/* eslint-disable @typescript-eslint/no-explicit-any */
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
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export interface FiltrosResidentesModalData {
  enfase: string | undefined;
}

export interface FiltrosResidentesModalProps extends DialogProps {
  filtros: FiltrosResidentesModalData;
  handleOnChange(name: keyof FiltrosResidentesModalData, value: any): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const FiltrosResidentesModal: React.FC<FiltrosResidentesModalProps> = (
  props
) => {
  const { open, setOpen, handleOnChange, filtros, ...rest } = props;

  const [values, setValues] = useState<FiltrosResidentesModalData>(filtros);

  const handleLimparFiltros = useCallback(() => {
    setValues({
      enfase: '',
    });
    handleOnChange('enfase', '');
  }, []);

  const handleAplicarFiltros = useCallback(() => {
    handleOnChange('enfase', values.enfase);
    setOpen(false);
  }, [values]);

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
      <DialogActions>
        <Grid container justify="space-between">
          <Button onClick={() => handleLimparFiltros()}>Limpar</Button>
          <Button
            color="secondary"
            startIcon={<CheckIcon />}
            onClick={() => handleAplicarFiltros()}
          >
            Aplicar filtros
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default FiltrosResidentesModal;
