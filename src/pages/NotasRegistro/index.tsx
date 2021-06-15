import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { uniqueId } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Link as LinkRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenericContent from 'src/components/GenericContent';
import GenericInput from 'src/components/inputs/GenericInput';
import ConfirmDialogModal from 'src/components/modals/ConfirmDialogModal';
import OfertaInfo from 'src/components/OfertaInfo';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import CONSTANTS from 'src/config';
import useOfertas from 'src/hooks/useOfertas';
import useResidentes from 'src/hooks/useResidentes';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce/lib';
import { SaveButton } from '../FaltasRegistro/styles';
import schema from './schema';

interface NotasRegistroParams {
  idTurma: string;
  idOferta: string;
}

interface NotasRegistroFromData {
  notas: Array<{
    teorica: number;
    final: number;
  }>;
}

const NotasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<NotasRegistroParams>();

  const [searchValue, setSearchValue] = useState('');

  const [open, setOpen] = useState(false);

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  const { findOferta, data: ofertasDataReturn } = useOfertas({
    id: Number(idTurma),
  });

  const oferta = findOferta({ id: Number(idOferta) });

  const { searchResidentes, data: residentesDataReturn } = useResidentes({
    idTurma,
    idOferta,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NotasRegistroFromData>({
    defaultValues: {
      notas: [],
    },
    resolver: yupResolver(schema),
  });

  // TODO: implementar
  const onSubmit = useCallback((formData: NotasRegistroFromData) => {
    console.log(formData);
    toast.success('Notas salvas com sucesso');
    setOpen(false);
  }, []);

  const handleRows = useMemo(
    () =>
      searchResidentes(searchValueDebaunced).map((residente) => [
        <Box key={uniqueId()} p={2}>
          <Avatar
            component={LinkRouter}
            to={NAMES.RESIDENTE_DETAILS.replace(':idTurma', idTurma)
              .replace(':idOferta', idOferta)
              .replace(':idResidente', String(residente.id))}
            src={`/static/images/avatars/avatar_${(residente.id % 11) + 1}.png`}
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
            name={`notas.${residente.id}.teorica`}
            defaultValue={0}
          />
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
            name={`notas.${residente.id}.final`}
            defaultValue={0}
          />
        </Box>,
      ]),
    [searchValueDebaunced, residentesDataReturn]
  );

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
    >
      <OfertaInfo
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
              value: <Typography variant="body1">Nota teórica</Typography>,
              align: 'left',
            },
            {
              value: <Typography variant="body1">Nota final</Typography>,
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
      <ConfirmDialogModal
        open={open}
        setOpen={setOpen}
        title="Confirmação de lançamento"
        contentText={`Você está realizando o lançamento de notas dos residentes da turma ${oferta?.turma.descricao} para a oferta ${oferta?.nome}.`}
        handleConfirm={handleSubmit(onSubmit)}
      />
    </GenericContent>
  );
};

export default NotasRegistro;
