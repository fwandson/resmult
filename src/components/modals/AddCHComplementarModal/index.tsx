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
import ResidenteAvatar from 'src/components/ResidenteAvatar';
import resources from 'src/resources';
import { useLoading } from 'src/context/LoadingContext';
import { find } from 'lodash';

export interface AddCHComplementarModalProps extends DialogProps {
  idTurma: number;
  idOferta: number;
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
    idTurma,
    idOferta,
    open,
    setOpen,
    residente,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate,
    ...rest
  } = props;

  const { showLoading, hideLoading } = useLoading();

  const { chComplementar } = resources;

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
  const onSubmit = useCallback(
    async (formaData: AddCHComplementarModalFormData) => {
      try {
        showLoading();

        const cargaHoraria = {
          residenteId: residente?.id || 0,
          cargaHoraria: formaData.chComplementar,
          justificativa: formaData.descricao,
          tipoCargaHoraria: String(formaData.tipoCh),
          tipoCargaHorariaComplementar: formaData.tipoChComplementar,
        };

        console.log(cargaHoraria);

        const response = await chComplementar.adicionar(
          {
            cargaHoraria,
          },
          idTurma,
          idOferta
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        hideLoading();
        setOpen(false);
        reset();
      }
    },
    []
  );

  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
  }, []);

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">
            Adicionar carga horária complementar
          </Typography>
          <IconButton onClick={handleCancel} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          {residente && (
            <ResidenteAvatar
              idTurma={Number(idTurma)}
              idOferta={Number(idOferta)}
              idResidente={residente.id}
              nomeResidente={residente.person.name[0]}
              photourl={residente.person.photourl}
            />
          )}
          <Box ml={2} display="flex" flexDirection="column">
            <Typography>{residente?.person.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              #{residente?.id}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {residente?.enfase.descricao}
            </Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography>
            {
              find(residente?.cargaHorariaPendente, { tipo: 'T' })
                ?.cargaHorariaPendente
            }{' '}
            horas
          </Typography>
          <Typography>
            {
              find(residente?.cargaHorariaPendente, { tipo: 'C' })
                ?.cargaHorariaPendente
            }{' '}
            horas
          </Typography>
          <Typography>
            {
              find(residente?.cargaHorariaPendente, { tipo: 'P' })
                ?.cargaHorariaPendente
            }{' '}
            horas
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
