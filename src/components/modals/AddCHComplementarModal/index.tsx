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
  MenuItem,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useCallback } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { useForm } from 'react-hook-form';
import GenericInput from 'src/components/inputs/GenericInput';

export interface AddCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AddCHComplementarModalFormData {
  chComplementar: number;
  tipoCh: number;
  tipoChComplementar: number;
  descricao: string;
}

const AddCHComplementarModal: React.FC<AddCHComplementarModalProps> = (
  props
) => {
  const { open, setOpen, ...rest } = props;

  const { control, handleSubmit } = useForm<AddCHComplementarModalFormData>({
    defaultValues: {
      chComplementar: 0,
      tipoCh: 0,
      tipoChComplementar: 0,
      descricao: '',
    },
  });

  // TODO: implementar
  const onSubmit = useCallback((formaData: AddCHComplementarModalFormData) => {
    console.log(formaData);
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">
            Adicionar carga horária complementar
          </Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <GenericInput
                variant="outlined"
                label="Tipo CH complementar"
                select
                fullWidth
                control={control}
                name="tipoChComplementar"
              >
                <MenuItem value={0} disabled>
                  Escolha
                </MenuItem>
                <MenuItem value={1}>Primeiro Ano</MenuItem>
                <MenuItem value={2}>Segundo Ano</MenuItem>
                <MenuItem value={3}>Terceiro Ano</MenuItem>
              </GenericInput>
            </Grid>
            <Grid item xs={6}>
              <GenericInput
                variant="outlined"
                label="Tipo CH"
                select
                fullWidth
                control={control}
                name="tipoCh"
              >
                <MenuItem value={0} disabled>
                  Escolha
                </MenuItem>
                <MenuItem value={1}>Primeiro Ano</MenuItem>
                <MenuItem value={2}>Segundo Ano</MenuItem>
                <MenuItem value={3}>Terceiro Ano</MenuItem>
              </GenericInput>
            </Grid>
            <Grid item xs={12}>
              <GenericInput
                variant="outlined"
                label="Carga horária complementar"
                type="number"
                fullWidth
                control={control}
                name="chComplementar"
              />
            </Grid>
            <Grid item xs={12}>
              <GenericInput
                variant="outlined"
                label="Descrição"
                fullWidth
                multiline
                rows={3}
                control={control}
                name="descricao"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            color="secondary"
            startIcon={<CheckIcon />}
            onClick={handleSubmit(onSubmit)}
          >
            Confirmar
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddCHComplementarModal;
