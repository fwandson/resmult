import { yupResolver } from '@hookform/resolvers/yup';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toPairs, uniqueId } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link as LinkRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericContent from 'src/components/GenericContent';
import GenericInput from 'src/components/inputs/GenericInput';
import FiltrosResidentesModal, {
  FiltrosResidentesModalData,
} from 'src/components/modals/FiltrosResidentesModal';
import OfertaInfo from 'src/components/OfertaInfo';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import CONSTANTS from 'src/config';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce/lib';
import schema from './schema';
import { SaveButton } from './styles';

interface FaltasRegistroParams {
  idTurma: string;
  idOferta: string;
}

interface FaltasRegistroFromData {
  ch: Array<{
    pratica: number;
    praticaObs: string;
    teoricoConceitual: number;
    teoricoConceitualObs: string;
    teoricoPratica: number;
    teoricoPraticaObs: string;
  }>;
}

const FaltasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<FaltasRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosResidentesModalData>({
    enfase: '',
  });

  const { data: residentesDataReturn, searchResidentes } = useResidentes({
    idTurma,
    idOferta,
  });

  const { findOferta, data: ofertasDataReturn } = useOfertas({
    id: idTurma,
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const handleCargaHoraria = useCallback(
    (tipo: string) =>
      oferta?.tipoCargaHoraria.find((elem) => elem.tipo === tipo)?.cargahoraria,
    [oferta]
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FaltasRegistroFromData>({
    defaultValues: {
      ch: [],
    },
    resolver: yupResolver(schema),
  });

  // TODO: implementar aqui
  const onSubmit = useCallback((formData: FaltasRegistroFromData) => {
    console.log(formData);
    toast.success('Faltas salvas com sucesso');
  }, []);

  const handleRows = useMemo(
    () =>
      searchResidentes(searchValueDebaunced)
        .filter((residente) => {
          if (filtros.enfase)
            return residente.enfase.id === Number(filtros.enfase);
          return true;
        })
        .map((residente) => [
          <Box key={uniqueId()} mb={5}>
            <Avatar
              component={LinkRouter}
              to={NAMES.RESIDENTE_DETAILS.replace(':id', String(residente.id))}
              src={`/static/images/avatars/avatar_${
                (residente.id % 11) + 1
              }.png`}
            >
              {residente.person.name[0]}
            </Avatar>
          </Box>,
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography>{residente.person.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {residente.enfase.descricao}
            </Typography>
            <Box m={2} />
            <Button>Gerar Relatório</Button>
          </Box>,
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            justifyItems="flex-start"
          >
            <GenericInput
              fullWidth
              variant="outlined"
              type="number"
              control={control}
              name={`ch.${residente.id}.pratica`}
              defaultValue={0}
            />
            <Box m={1} />
            <Accordion square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Observação</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <GenericInput
                  fullWidth
                  variant="outlined"
                  multiline
                  control={control}
                  name={`ch.${residente.id}.praticaObs`}
                />
              </AccordionDetails>
            </Accordion>
          </Box>,
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            justifyItems="flex-start"
          >
            <GenericInput
              fullWidth
              variant="outlined"
              type="number"
              control={control}
              name={`ch.${residente.id}.teoricoConceitual`}
              defaultValue={0}
            />
            <Box m={1} />
            <Accordion square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Observação</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <GenericInput
                  fullWidth
                  variant="outlined"
                  multiline
                  control={control}
                  name={`ch.${residente.id}.teoricoConceitualObs`}
                />
              </AccordionDetails>
            </Accordion>
          </Box>,
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            justifyItems="flex-start"
          >
            <GenericInput
              fullWidth
              variant="outlined"
              type="number"
              control={control}
              name={`ch.${residente.id}.teoricoPratica`}
              defaultValue={0}
            />
            <Box m={1} />
            <Accordion square>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Observação</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <GenericInput
                  fullWidth
                  variant="outlined"
                  multiline
                  control={control}
                  name={`ch.${residente.id}.teoricoPraticaObs`}
                />
              </AccordionDetails>
            </Accordion>
          </Box>,
        ]),
    [searchValueDebaunced, residentesDataReturn, filtros.enfase]
  );

  return (
    <GenericContent
      helmetText="Registro de faltas | Sagu"
      title="Registro de faltas"
      isLoading={!residentesDataReturn || !ofertasDataReturn}
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
        <SimpleTable
          title="Residentes"
          onClickFilterButton={() => setOpen(true)}
          hideTablePagination
          chips={toPairs(filtros)
            .filter((pair) => pair[1])
            .map((pair) => `${pair[0]}: ${pair[1]}`)}
          headCells={[
            {
              value: <Typography variant="body1">Foto</Typography>,
              align: 'left',
            },
            {
              value: (
                <Typography variant="body1">Residente / Ênfase</Typography>
              ),
              align: 'left',
            },
            {
              value: (
                <Tooltip title="Prática" placement="top-start">
                  <Box>
                    <Typography variant="body1">Prática</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`(${handleCargaHoraria('P')} Horas)`}
                    </Typography>
                  </Box>
                </Tooltip>
              ),
              align: 'left',
            },
            {
              value: (
                <Tooltip title="EAD + presencial" placement="top-start">
                  <Box>
                    <Typography variant="body1">Teórico-conceitual</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`(${handleCargaHoraria('C')} Horas)`}
                    </Typography>
                  </Box>
                </Tooltip>
              ),
              align: 'left',
            },
            {
              value: (
                <Tooltip title="Campo + núcleo" placement="top-start">
                  <Box>
                    <Typography variant="body1">Teórico-prática</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`(${handleCargaHoraria('T')} Horas)`}
                    </Typography>
                  </Box>
                </Tooltip>
              ),
              align: 'left',
            },
          ]}
          rows={handleRows}
        />
        <SaveButton
          variant="extended"
          color="secondary"
          type="submit"
          disabled={isSubmitting}
        >
          <CheckIcon />
          Salvar
        </SaveButton>
      </form>
      <FiltrosResidentesModal
        setOpen={setOpen}
        filtros={filtros}
        enfases={oferta?.atividadeModulo.enfases.map((enfase) => ({
          id: enfase.id,
          abreviatura: enfase.abreviatura,
          descricao: enfase.descricao,
        }))}
        {...rest}
      />
      <Box m={2} />
    </GenericContent>
  );
};

export default FaltasRegistro;
