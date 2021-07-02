import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { find, reduce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import CHComplementarCardInfo from 'src/components/CHComplementarCardInfo';
import CHPendentesInfo from 'src/components/CHPendentesInfo';
import ResidenteAvatar from 'src/components/ResidenteAvatar';
import { GetResidentesNames } from 'src/resources/turmas/types';

export interface ViewCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  residente: GetResidentesNames.Residente | undefined;
  idTurma: number;
  idOferta: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: any;
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
  const {
    open,
    setOpen,
    residente,
    idTurma,
    idOferta,
    mutate,
    ...rest
  } = props;

  const totalCHComplementates = reduce(
    residente?.cargahorariacomplementar,
    (sum, elem) => sum + Number(elem.cargaHoraria),
    0
  );

  return (
    <Dialog open={open} {...rest} fullWidth fullScreen>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Cargas horárias complementares</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
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
          <Box>
            <Typography variant="body1" gutterBottom>
              Pendências
            </Typography>
            <CHPendentesInfo
              inline
              data={{
                pratica: find(residente?.cargaHorariaPendente, { tipo: 'P' })
                  ?.cargaHorariaPendente,
                teoricoPratica: find(residente?.cargaHorariaPendente, {
                  tipo: 'T',
                })?.cargaHorariaPendente,
                teoricoConceitual: find(residente?.cargaHorariaPendente, {
                  tipo: 'C',
                })?.cargaHorariaPendente,
              }}
            />
          </Box>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {residente?.cargahorariacomplementar.length === 0 && (
              <Grid item xs={12}>
                <Typography color="secondary" align="center" paragraph>
                  Sem cargas horárias complemetares cadastradas
                </Typography>
              </Grid>
            )}
            {residente?.cargahorariacomplementar.reverse().map((elem) => (
              <Grid key={elem.id} item xs={12}>
                <CHComplementarCardInfo
                  data={{
                    id: elem.id,
                    cargaHoraria: Number(elem.cargaHoraria),
                    tipoCargaHoraria: elem.tipoCargaHoraria,
                    tipoCargaHorariaComplementar:
                      elem.tipoCargaHorariaComplementar.id,
                    justificativa: elem.justificativa,
                  }}
                  mutate={mutate}
                  idTurma={idTurma}
                  idOferta={idOferta}
                  idResidente={residente.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={2} mb={2}>
          <Typography>
            Total de horas de CH complementares: {totalCHComplementates} horas
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCHComplementarModal;
