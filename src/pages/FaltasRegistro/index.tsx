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
  InputAdornment,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { uniqueId } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link as LinkRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericContent from 'src/components/GenericContent';
import GenericInput from 'src/components/inputs/GenericInput';
import ConfirmDialogModal from 'src/components/modals/ConfirmDialogModal';
import FiltrosResidentesModal, {
  FiltrosResidentesModalData,
} from 'src/components/modals/FiltrosResidentesModal';
import OfertaInfo from 'src/components/OfertaInfo';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import CONSTANTS from 'src/config';
import { useLoading } from 'src/context/LoadingContext';
import useEnfases from 'src/hooks/useEnfases';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import resources from 'src/resources';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce/lib';
import generateSchemaFaltas from './schema';
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

  const { showLoading, hideLoading } = useLoading();

  const { faltas } = resources;

  const [openConfirmDialogModal, setOpenConfirmDialogModal] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const {
    filtros,
    setOpen: setOpenFiltrosModal,
    ...rest
  } = useFiltrosModal<FiltrosResidentesModalData>({
    enfase: '',
  });

  const {
    data: residentesDataReturn,
    searchResidentes,
    mutate: residentesMutate,
  } = useResidentes({
    idTurma,
    idOferta,
  });

  const { findOferta, data: ofertasDataReturn } = useOfertas({
    id: idTurma,
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const { findEnfase, data: enfaseDataReturn } = useEnfases();

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
    resolver: yupResolver(
      generateSchemaFaltas({
        maxPratica: Number(handleCargaHoraria('P')),
        maxTeoricoConceitual: Number(handleCargaHoraria('C')),
        maxTeoricoPratica: Number(handleCargaHoraria('T')),
      })
    ),
  });

  // Lembrar que o id representa o id do residente
  const onSubmit = useCallback(async (formData: FaltasRegistroFromData) => {
    try {
      setOpenConfirmDialogModal(false);

      showLoading();

      const data = new Array<{
        residenteid: number;
        falta: number;
        tipo: string;
        observacao: string;
      }>();

      Object.entries(formData.ch).forEach((element) => {
        data.push({
          residenteid: Number(element[0]),
          falta: element[1].teoricoConceitual,
          tipo: 'C',
          observacao: element[1].teoricoConceitualObs,
        });
        data.push({
          residenteid: Number(element[0]),
          falta: element[1].pratica,
          tipo: 'P',
          observacao: element[1].praticaObs,
        });
        data.push({
          residenteid: Number(element[0]),
          falta: element[1].teoricoPratica,
          tipo: 'T',
          observacao: element[1].teoricoPraticaObs,
        });
      });

      await faltas.registar(
        {
          faltas: data,
        },
        Number(idTurma),
        Number(idOferta)
      );

      residentesMutate();

      toast.success('Faltas salvas com sucesso');
    } catch (error) {
      // TODO: melhorar essa parte
      toast.error('Algo inesperado aconteceu');
    } finally {
      hideLoading();
    }
  }, []);

  // TODO: implementar
  const handleGerarRelatorio = useCallback((residenteId: number) => {
    toast.success(`Relatório gerado com sucesso ${residenteId}`);
  }, []);

  const handleChipsTable = useCallback(() => {
    if (filtros.enfase)
      return [
        {
          label: 'Ênfase',
          value: findEnfase({ id: Number(filtros.enfase) })?.descricao || '',
        },
      ];
    return [];
  }, [filtros, enfaseDataReturn]);

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
              to={NAMES.RESIDENTE_DETAILS.replace(':idTurma', idTurma)
                .replace(':idOferta', idOferta)
                .replace(':idResidente', String(residente.id))}
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
            <Button onClick={() => handleGerarRelatorio(residente.id)}>
              Gerar Relatório
            </Button>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">horas</InputAdornment>
                ),
              }}
              name={`ch.${residente.id}.pratica`}
              defaultValue={Number(
                residente.faltas.find((falta) => falta.tipo === 'P')?.falta
              )}
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
                  defaultValue={
                    residente.faltas.find((falta) => falta.tipo === 'P')
                      ?.observacao
                  }
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">horas</InputAdornment>
                ),
              }}
              control={control}
              name={`ch.${residente.id}.teoricoConceitual`}
              defaultValue={Number(
                residente.faltas.find((falta) => falta.tipo === 'C')?.falta
              )}
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
                  defaultValue={
                    residente.faltas.find((falta) => falta.tipo === 'C')
                      ?.observacao
                  }
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">horas</InputAdornment>
                ),
              }}
              control={control}
              name={`ch.${residente.id}.teoricoPratica`}
              defaultValue={Number(
                residente.faltas.find((falta) => falta.tipo === 'T')?.falta
              )}
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
                  defaultValue={
                    residente.faltas.find((falta) => falta.tipo === 'T')
                      ?.observacao
                  }
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

      {/* <pre>{JSON.stringify(residentesDataReturn, null, 2)}</pre> */}

      <form>
        <SimpleTable
          title="Residentes"
          onClickFilterButton={() => setOpenFiltrosModal(true)}
          hideTablePagination
          chips={handleChipsTable()}
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
          disabled={isSubmitting}
          onClick={() => setOpenConfirmDialogModal(true)}
        >
          <CheckIcon />
          Salvar
        </SaveButton>
      </form>
      <FiltrosResidentesModal
        setOpen={setOpenFiltrosModal}
        filtros={filtros}
        enfases={oferta?.atividadeModulo.enfases.map((enfase) => ({
          id: enfase.id,
          abreviatura: enfase.abreviatura,
          descricao: enfase.descricao,
        }))}
        {...rest}
      />
      <ConfirmDialogModal
        open={openConfirmDialogModal}
        setOpen={setOpenConfirmDialogModal}
        title="Confirmação de lançamento"
        contentText={`Você está realizando o lançamento de faltas dos residentes da turma ${oferta?.turma.descricao} para a oferta ${oferta?.nome}.`}
        handleConfirm={handleSubmit(onSubmit)}
      />
      <Box m={2} />
    </GenericContent>
  );
};

export default FaltasRegistro;
