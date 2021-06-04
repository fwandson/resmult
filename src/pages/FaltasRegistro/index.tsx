import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import GenericContent from 'src/components/GenericContent';
import GenericInput from 'src/components/inputs/GenericInput';
import OfertaInfo from 'src/components/OfertaInfo';
import SearchField from 'src/components/SearchField';
import CONSTANTS from 'src/config';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import { useDebounce } from 'use-debounce/lib';
import { SaveButton } from './styles';

interface FaltasRegistroParams {
  idTurma: string;
  idOferta: string;
}

interface FaltasRegistroFromData {
  ch: Array<{
    pratica: number;
    teoricoConceitual: number;
    teoricoPratica: number;
  }>;
}

const FaltasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<FaltasRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { searchResidentes } = useResidentes({
    idTurma,
    idOferta,
  });

  const { findOferta } = useOfertas({
    id: idTurma,
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const handleCargaHoraria = useCallback(
    (tipo: string) =>
      oferta?.tipoCargaHoraria.find((elem) => elem.tipo === tipo)?.cargahoraria,
    [oferta]
  );

  const { control, handleSubmit } = useForm<FaltasRegistroFromData>({
    defaultValues: {
      ch: [],
    },
  });

  // TODO: implementar aqui
  const onSubmit = useCallback((formData: FaltasRegistroFromData) => {
    console.log(formData);
    toast.success('Faltas salvas com sucesso');
  }, []);

  return (
    <GenericContent
      helmetText="Registro de faltas | Sagu"
      title="Registro de faltas"
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
    >
      <OfertaInfo
        cod={oferta?.turma.codigoTurma}
        nome={oferta?.nome}
        inicio={oferta?.dataInicio}
        fim={oferta?.dataFim}
        cargaHoraria={oferta?.cargahoraria}
        periodo={oferta?.semestre_descricao}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Grid container component={CardContent} spacing={2}>
            <Grid item xs={1}>
              <Typography variant="body1">Foto</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">Residente</Typography>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Prática" placement="top-start">
                <Box>
                  <Typography variant="body1">Prática</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`(${handleCargaHoraria('P')} Horas)`}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title="EAD + presencial" placement="top-start">
                <Box>
                  <Typography variant="body1">Teórico-conceitual</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`(${handleCargaHoraria('C')} Horas)`}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title="Campo + núcleo" placement="top-start">
                <Box>
                  <Typography variant="body1">Teórico-prática</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`(${handleCargaHoraria('T')} Horas)`}
                  </Typography>
                </Box>
              </Tooltip>
            </Grid>

            {searchResidentes(searchValueDebaunced).map((residente) => (
              <React.Fragment key={residente.id}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={1}>
                  <Avatar
                    src={`/static/images/avatars/avatar_${
                      (residente.id % 11) + 1
                    }.png`}
                  >
                    {residente.person.name[0]}
                  </Avatar>
                </Grid>
                <Grid
                  container
                  item
                  xs={3}
                  justify="space-between"
                  direction="column"
                >
                  <Grid item>
                    <Typography>{residente.person.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Button>Gerar Relatório</Button>
                  </Grid>
                </Grid>
                <Grid item xs={2} justify="space-between">
                  <GenericInput
                    fullWidth
                    variant="outlined"
                    type="number"
                    control={control}
                    name={`ch.${residente.id}.pratica`}
                  />
                  <Box m={1} />
                  <Button fullWidth startIcon={<AddIcon />}>
                    Observação
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <GenericInput
                    fullWidth
                    variant="outlined"
                    type="number"
                    control={control}
                    name={`ch.${residente.id}.teoricoConceitual`}
                  />
                  <Box m={1} />
                  <Button fullWidth startIcon={<AddIcon />}>
                    Observação
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <GenericInput
                    fullWidth
                    variant="outlined"
                    type="number"
                    control={control}
                    name={`ch.${residente.id}.teoricoPratica`}
                  />
                  <Box m={1} />
                  <Button fullWidth startIcon={<AddIcon />}>
                    Observação
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <SaveButton variant="extended" color="secondary" type="submit">
            <CheckIcon />
            Salvar
          </SaveButton>
        </Card>
      </form>
      <Box m={2} />
    </GenericContent>
  );
};

export default FaltasRegistro;
