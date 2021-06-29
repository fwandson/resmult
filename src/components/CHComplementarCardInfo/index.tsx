import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLoading } from 'src/context/LoadingContext';
import useTiposCargaHoraria from 'src/hooks/useTiposCargaHoraria';
import useTiposCargaHorariaComplementar from 'src/hooks/useTiposCargaHorariaComplementar';
import resources from 'src/resources';
import DoubleConfirmButton from '../DoubleConfirmButton';
import CHComplementarCardInfoForm from './CHComplementarCardInfoForm';
import schema from './schema';
import { Container } from './styles';

interface CHComplementarData {
  id: number;
  tipoCargaHorariaComplementar: number;
  cargaHoraria: number;
  justificativa: string;
  tipoCargaHoraria: string;
}

interface CHComplementarCardInfoProps {
  data: CHComplementarData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: any;
  idTurma: number;
  idOferta: number;
  idResidente: number;
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
  const { data, idTurma, idOferta, idResidente, mutate } = props;

  const { chComplementar } = resources;

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

  const onSubmit = useCallback(
    async (formaData: CHComplementarCardInfoFormData) => {
      try {
        showLoading();

        await chComplementar.editar({
          idTurma,
          idOferta,
          idChComplementar: data.id,
          cargaHoraria: {
            cargaHoraria: formaData.chComplementar,
            justificativa: formaData.descricao,
            residenteId: idResidente,
            tipoCargaHoraria: formaData.tipoCh,
            tipoCargaHorariaComplementar: formaData.tipoChComplementar,
          },
        });

        await mutate();

        toast.success('CH editada com sucesso');

        setAsEditing(false);
      } catch (error) {
        console.error(error);
        // TODO: melhorar isso
        toast.error('Algo inesperado aconteceu');
      } finally {
        hideLoading();
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

  const handleConfirmDelete = useCallback(async () => {
    try {
      showLoading();

      await chComplementar.remover({
        idTurma,
        idOferta,
        idChComplementar: data.id,
      });

      await mutate();

      toast.success(`CH Complementar #${data.id} removida com sucesso`);
    } catch (error) {
      // TODO: melhorar isso aqui
      console.error(error);
      toast.error('Algo de errado aconteceu');
    } finally {
      hideLoading();
      setAsEditing(false);
    }
  }, [data]);

  return (
    <Container variant="outlined">
      <CardHeader
        title={<Typography variant="subtitle1">#ID: {data.id}</Typography>}
      />
      <CardContent>
        {asEditing ? (
          <CHComplementarCardInfoForm
            control={control}
            tiposCH={tiposCH}
            tiposCHComplementar={tiposCHComplementar}
          />
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
              handleConfirm={handleConfirmDelete}
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
