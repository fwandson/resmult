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
  Box,
  InputAdornment,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useCallback } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { useForm } from 'react-hook-form';
import GenericInput from 'src/components/inputs/GenericInput';
import { GetResidentesNames } from 'src/resources/turmas/types';
import useTiposCargaHoraria from 'src/hooks/useTiposCargaHoraria';
import useTiposCargaHorariaComplementar from 'src/hooks/useTiposCargaHorariaComplementar';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';

export interface AddCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  residente: GetResidentesNames.Residente | undefined;
  mutate(): void;
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
  const {
    open,
    setOpen,
    residente,
    // mutate,
    ...rest
  } = props;

  const { data: tiposCH } = useTiposCargaHoraria();

  const { data: tiposCHComplementar } = useTiposCargaHorariaComplementar();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<AddCHComplementarModalFormData>({
    defaultValues: {
      chComplementar: 0,
      tipoCh: 0,
      tipoChComplementar: 0,
      descricao: '',
    },
    resolver: yupResolver(schema),
  });

  // TODO: implementar
  const onSubmit = useCallback((formaData: AddCHComplementarModalFormData) => {
    console.log(formaData);
    setOpen(false);
    reset();
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
  }, []);

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">
            Adicionar carga horária complementar
          </Typography>
          <IconButton onClick={handleCancel} edge="end">
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
        <form>
          <Grid container spacing={2}>
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
                {tiposCHComplementar?.map((elem) => (
                  <MenuItem key={elem.id} value={elem.id}>
                    {elem.descricao}
                  </MenuItem>
                ))}
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
                {tiposCH?.map((elem) => (
                  <MenuItem key={elem.id} value={elem.id}>
                    {elem.descricao}
                  </MenuItem>
                ))}
              </GenericInput>
            </Grid>
            <Grid item xs={12}>
              <GenericInput
                variant="outlined"
                label="Carga horária complementar"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">horas</InputAdornment>
                  ),
                }}
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
          <Button onClick={handleCancel}>Cancelar</Button>
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
