import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import GenericContent from 'src/components/GenericContent';
import InputNota from 'src/components/inputs/InputNota';
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
import { SaveButton } from '../FaltasRegistro/styles';
import schema from './schema';

interface NotasRegistroParams {
  idTurma: string;
  idOferta: string;
}

interface Residente {
  id: number;
  notas: {
    atividadeDeProduto: string | undefined;
    avaliacaoDeDesempenho: string | undefined;
  };
}

interface NotasRegistroFromData {
  residentes: Residente[];
}

const NotasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<NotasRegistroParams>();

  const { showLoading, hideLoading } = useLoading();

  const { notas } = resources;

  const [searchValue, setSearchValue] = useState('');

  const [open, setOpen] = useState(false);

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findEnfase, data: enfaseDataReturn } = useEnfases();

  const {
    filtros,
    setOpen: setOpenFiltrosModal,
    ...rest
  } = useFiltrosModal<FiltrosResidentesModalData>({
    enfase: '',
  });

  const { findOferta, data: ofertasDataReturn } = useOfertas({
    id: Number(idTurma),
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const {
    searchResidentes,
    data: residentesDataReturn,
    mutate: residentesMutate,
  } = useResidentes({
    idTurma,
    idOferta,
  });

  const defaultValues = useMemo(
    () => ({
      residentes: residentesDataReturn?.residentes.map((residente) => ({
        id: residente.id,
        notas: {
          atividadeDeProduto: residente.nota?.notaDeAtividadeDeProduto || '',
          avaliacaoDeDesempenho:
            residente.nota?.notaDeAvaliacaoDeDesempenho || '',
        },
      })),
    }),
    [residentesDataReturn]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NotasRegistroFromData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (formData: NotasRegistroFromData) => {
    try {
      showLoading();

      const data = {
        notas: formData.residentes.map((elem) => ({
          residenteid: elem.id,
          notadeatividadedeproduto: elem.notas.atividadeDeProduto || null,
          // Nota avaliação discente <=> nota de avaliação de desempenho
          notadeavaliacaodedesempenho: elem.notas.avaliacaoDeDesempenho || null,
        })),
      };

      await notas.registar(data, Number(idTurma), Number(idOferta));

      residentesMutate();

      toast.success('Notas salvas com sucesso');
    } catch (error) {
      toast.error(error.response.data.mensagem);
    } finally {
      hideLoading();
    }
  }, []);

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
            key="foto"
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
          <ResidenteInfo
            key="residente"
            data={{
              id: residente.id,
              name: residente.person.name,
              enfase: residente.enfase.descricao,
            }}
          />,
          <Box
            key="nota-atividade-produto"
            display="flex"
            flexDirection="column"
            justifyItems="flex-start"
          >
            <InputNota
              fullWidth
              variant="outlined"
              control={control}
              name={`residentes.${index}.notas.atividadeDeProduto`}
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Box>,
          <Box
            key="nota-avaliacao-discente"
            display="flex"
            flexDirection="column"
            justifyItems="flex-start"
          >
            <InputNota
              fullWidth
              variant="outlined"
              control={control}
              name={`residentes.${index}.notas.avaliacaoDeDesempenho`}
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Box>,
        ]),
    [searchValueDebaunced, residentesDataReturn, filtros.enfase]
  );

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

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <GenericContent
      helmetText="Notas | Sagu"
      title="Registro de notas"
      isLoading={!residentesDataReturn || !ofertasDataReturn}
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
      breadcrumbsLinks={[
        { label: 'MINHAS TURMAS', href: NAMES.TURMAS },
        { label: 'REGISTRO DE NOTAS' },
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
          hideTablePagination
          onClickFilterButton={() => setOpenFiltrosModal(true)}
          chips={handleChipsTable()}
          headCells={[
            {
              value: <Typography variant="body1">Foto</Typography>,
              align: 'center',
            },
            {
              value: (
                <Typography variant="body1">Residente / Ênfase</Typography>
              ),
              align: 'left',
            },
            {
              value: (
                <Typography variant="body1">
                  Nota atividade do produto
                </Typography>
              ),
              align: 'left',
            },
            {
              value: (
                <Typography variant="body1">
                  Nota de avaliação discente
                </Typography>
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
          onClick={() => setOpen(true)}
        >
          <CheckIcon />
          Salvar
        </SaveButton>
      </form>
      <Box m={2} />
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
        open={open}
        setOpen={setOpen}
        title="Confirmação de lançamento"
        contentText={
          <Typography>
            Você está realizando o lançamento de notas dos residentes da turma{' '}
            <strong>{oferta?.turma.descricao}</strong> para a oferta{' '}
            <strong>{oferta?.nome}</strong>.
          </Typography>
        }
        handleConfirm={handleSubmit(onSubmit)}
      />
    </GenericContent>
  );
};

export default NotasRegistro;
