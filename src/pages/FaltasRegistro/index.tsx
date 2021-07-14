import { yupResolver } from '@hookform/resolvers/yup';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import { uniqueId } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import GenericContent from 'src/components/GenericContent';
import GenericInput from 'src/components/inputs/GenericInput';
import ConfirmDialogModal from 'src/components/modals/ConfirmDialogModal';
import FiltrosResidentesModal, {
  FiltrosResidentesModalData,
} from 'src/components/modals/FiltrosResidentesModal';
import OfertaInfo from 'src/components/OfertaInfo';
import ResidenteAvatar from 'src/components/ResidenteAvatar';
import ResidenteInfo from 'src/components/ResidenteInfo';
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

interface Reridente {
  id: number;
  pratica: {
    falta: number;
    obs: string;
  };
  teoricoConceitual: {
    falta: number;
    obs: string;
  };
  teoricoPratica: {
    falta: number;
    obs: string;
  };
}

interface FaltasRegistroFromData {
  residentes: Reridente[];
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

  const defaultValues = useMemo(
    () => ({
      residentes: residentesDataReturn?.residentes.map((residente) => ({
        id: residente.id,
        pratica: {
          falta:
            Number(
              residente.faltas.find((falta) => falta.tipo === 'P')?.falta
            ) || 0,
          obs:
            residente.faltas.find((falta) => falta.tipo === 'P')?.observacao ||
            '',
        },
        teoricoConceitual: {
          falta:
            Number(
              residente.faltas.find((falta) => falta.tipo === 'C')?.falta
            ) || 0,
          obs:
            residente.faltas.find((falta) => falta.tipo === 'C')?.observacao ||
            '',
        },
        teoricoPratica: {
          falta:
            Number(
              residente.faltas.find((falta) => falta.tipo === 'T')?.falta
            ) || 0,
          obs:
            residente.faltas.find((falta) => falta.tipo === 'T')?.observacao ||
            '',
        },
      })),
    }),
    [residentesDataReturn]
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FaltasRegistroFromData>({
    defaultValues,
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
      showLoading();

      const data = new Array<{
        residenteid: number;
        falta: number;
        tipo: string;
        observacao: string;
      }>();

      formData.residentes.forEach((elem) => {
        data.push({
          residenteid: elem.id,
          falta: elem.teoricoConceitual.falta,
          tipo: 'C',
          observacao: elem.teoricoConceitual.obs,
        });
        data.push({
          residenteid: elem.id,
          falta: elem.pratica.falta,
          tipo: 'P',
          observacao: elem.pratica.obs,
        });
        data.push({
          residenteid: elem.id,
          falta: elem.teoricoPratica.falta,
          tipo: 'T',
          observacao: elem.teoricoPratica.obs,
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
      toast.error(error.response.data.mensagem);
    } finally {
      hideLoading();
    }
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
        .map((residente, index) => [
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <ResidenteAvatar
              idTurma={Number(idTurma)}
              idOferta={Number(idOferta)}
              idResidente={residente.id}
              nomeResidente={residente.person.name[0]}
              photourl={residente.person.photourl}
            />
          </Box>,
          <Box
            key={uniqueId()}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <ResidenteInfo
              data={{
                id: residente.id,
                name: residente.person.name,
                enfase: residente.enfase.descricao,
              }}
            />
            {/* TODO: colocar aqui o button para gerar o relatório do residente */}
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
              name={`residentes.${index}.pratica.falta`}
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
                  name={`residentes.${index}.pratica.obs`}
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
              name={`residentes.${index}.teoricoConceitual.falta`}
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
                  name={`residentes.${index}.teoricoConceitual.obs`}
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
              name={`residentes.${index}.teoricoPratica.falta`}
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
                  name={`residentes.${index}.teoricoPratica.obs`}
                />
              </AccordionDetails>
            </Accordion>
          </Box>,
        ]),
    [searchValueDebaunced, residentesDataReturn, filtros.enfase]
  );

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

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
      breadcrumbsLinks={[
        { label: 'MINHAS TURMAS', href: NAMES.TURMAS },
        { label: 'REGISTRO DE FALTAS' },
      ]}
    >
      <OfertaInfo
        id={oferta?.id}
        cod={oferta?.turma.codigoTurma}
        nome={oferta?.nome}
        inicio={oferta?.dataInicio}
        fim={oferta?.dataFim}
        cargaHoraria={oferta?.cargahoraria}
        periodo={oferta?.semestre_descricao}
      />
      <form>
        <SimpleTable
          title="Residentes"
          onClickFilterButton={() => setOpenFiltrosModal(true)}
          hideTablePagination
          chips={handleChipsTable()}
          initialOrderBy="residente"
          headCells={[
            {
              id: 'foto',
              value: <Typography variant="body1">Foto</Typography>,
              align: 'center',
            },
            {
              id: 'residente',
              value: (
                <Typography variant="body1">Residente / Ênfase</Typography>
              ),
              align: 'left',
            },
            {
              id: 'pratica',
              value: (
                <Tooltip title="Prática" placement="top-start">
                  <Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1">Prática</Typography>
                      <Box m={1} />
                      <InfoIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {`(${handleCargaHoraria('P')} Horas)`}
                    </Typography>
                  </Box>
                </Tooltip>
              ),
              align: 'left',
            },
            {
              id: 'teoricoConceitual',
              value: (
                <Tooltip title="EAD + presencial" placement="top-start">
                  <Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1">
                        Teórico-conceitual
                      </Typography>
                      <Box m={1} />
                      <InfoIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {`(${handleCargaHoraria('C')} Horas)`}
                    </Typography>
                  </Box>
                </Tooltip>
              ),
              align: 'left',
            },
            {
              id: 'teoricoPratica',
              value: (
                <Tooltip title="Campo + núcleo" placement="top-start">
                  <Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1">Teórico-prática</Typography>
                      <Box m={1} />
                      <InfoIcon fontSize="small" />
                    </Box>
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
        contentText={
          <Typography>
            Você está realizando o lançamento de faltas dos residentes da turma{' '}
            <strong>{oferta?.turma.descricao}</strong> para a oferta{' '}
            <strong>{oferta?.nome}</strong>.
          </Typography>
        }
        handleConfirm={handleSubmit(onSubmit)}
      />
      <Box m={2} />
    </GenericContent>
  );
};

export default FaltasRegistro;
