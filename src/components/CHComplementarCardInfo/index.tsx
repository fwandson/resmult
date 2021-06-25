import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoading } from 'src/context/LoadingContext';
import useTiposCargaHoraria from 'src/hooks/useTiposCargaHoraria';
import useTiposCargaHorariaComplementar from 'src/hooks/useTiposCargaHorariaComplementar';
import DoubleConfirmButton from '../DoubleConfirmButton';
import GenericInput from '../inputs/GenericInput';
import { Container } from './styles';
import schema from './schema';

interface CHComplementarData {
  id: number;
  tipoCargaHorariaComplementar: number;
  cargaHoraria: number;
  justificativa: string;
  tipoCargaHoraria: string;
}

interface CHComplementarCardInfoProps {
  data: CHComplementarData;
}

export interface CHComplementarCardInfoFormData {
  chComplementar: number;
  tipoCh: string;
  tipoChComplementar: number;
  descricao: string;
}

const CHComplementarCardInfo: React.FC<CHComplementarCardInfoProps> = (
  props
) => {
  const { data } = props;

  const { showLoading, hideLoading } = useLoading();

  const [asEditing, setAsEditing] = useState(false);

  const { data: tiposCH } = useTiposCargaHoraria();

  const { data: tiposCHComplementar } = useTiposCargaHorariaComplementar();

  const handleCHDescricao = (id: string) => {
    if (tiposCH) return tiposCH.find((elem) => elem.id === id)?.descricao;
    return '';
  };

  const handleCHComplementarDescricao = (id: number) => {
    if (tiposCHComplementar)
      return tiposCHComplementar.find((elem) => elem.id === id)?.descricao;
    return '';
  };

  const defaultValues = useMemo(
    () => ({
      chComplementar: data.cargaHoraria,
      tipoCh: data.tipoCargaHoraria,
      tipoChComplementar: data.tipoCargaHorariaComplementar,
      descricao: data.justificativa,
    }),
    [data]
  );

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<CHComplementarCardInfoFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // TODO: implementar
  const onSubmit = useCallback(
    async (formaData: CHComplementarCardInfoFormData) => {
      try {
        showLoading();
        setTimeout(() => {
          console.log(formaData);
          hideLoading();
          setAsEditing(false);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const handleEditar = () => {
    reset(defaultValues);
    setAsEditing(true);
  };

  const handleCancelarEditar = () => {
    reset(defaultValues);
    setAsEditing(false);
  };

  return (
    <Container variant="outlined">
      <CardHeader
        title={<Typography variant="subtitle1">#ID: {data.id}</Typography>}
      />
      <CardContent>
        {asEditing ? (
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <GenericInput
                  variant="outlined"
                  label="Tipo CH complementar"
                  select
                  fullWidth
                  control={control}
                  name="tipoChComplementar"
                >
                  {tiposCHComplementar?.map((elem) => (
                    <MenuItem key={elem.id} value={elem.id}>
                      {elem.descricao}
                    </MenuItem>
                  ))}
                </GenericInput>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <GenericInput
                  variant="outlined"
                  label="Tipo CH"
                  select
                  fullWidth
                  control={control}
                  name="tipoCh"
                >
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
        ) : (
          <Box>
            <Typography>
              Tipo CH coomplementar:{' '}
              {handleCHComplementarDescricao(data.tipoCargaHorariaComplementar)}
            </Typography>
            <Typography>
              Tipo da CH: {handleCHDescricao(data.tipoCargaHoraria)}
            </Typography>
            <Typography>
              Quantidade de horas: {data.cargaHoraria} horas
            </Typography>
            <Typography>Justificativa: {data.justificativa}</Typography>
          </Box>
        )}
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        {asEditing ? (
          <>
            <Button onClick={handleCancelarEditar} color="secondary">
              Cancelar Edição
            </Button>
            <Button onClick={handleSubmit(onSubmit)} color="primary">
              Confirmar Edição
            </Button>
          </>
        ) : (
          <>
            <DoubleConfirmButton
              delay={2000}
              handleConfirm={() => console.log('handleConfirm')}
              startIcon={<DeleteIcon />}
              color="secondary"
            >
              Remover
            </DoubleConfirmButton>
            <Button
              startIcon={<EditIcon />}
              onClick={handleEditar}
              color="primary"
            >
              Editar
            </Button>
          </>
        )}
      </CardActions>
    </Container>
  );
};

export default CHComplementarCardInfo;
