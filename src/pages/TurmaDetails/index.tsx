import { Box, Typography } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import CustonIconButton from 'src/components/CustonIconButton';
import GenericContent from 'src/components/GenericContent';
import FiltrosOfertasModal, {
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import TurmaInfo from 'src/components/TurmaInfo';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
import useOfertas from 'src/hooks/useOfertas';
import useTurmas from 'src/hooks/useTurmas';
import NAMES from 'src/routes/names';
import { useDebounce } from 'use-debounce';

interface TurmaDetailsParams {
  id: string;
}

const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(searchValue, 1000);

  const { data: turmasData } = useTurmas();

  const turma = turmasData?.turmas.find((elem) => elem.id === Number(id));

  const { data: ofertasReturnData } = useOfertas({
    id: Number(id),
  });

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosOfertasModalData>({
    turma: 0,
    periodo: 0,
    nucleo: 0,
    enfase: 0,
    inicio: new Date(),
    fim: new Date(),
  });

  const handlerGoToRegistrofaltas = useCallback(
    (idOferta: number) => {
      history.push(
        NAMES.FALTAS_REGISTRO.replace(':idTurma', id).replace(
          ':idOferta',
          String(idOferta)
        )
      );
    },
    [id]
  );

  const handleRows = () => {
    if (ofertasReturnData) {
      return ofertasReturnData.ofertasModulos
        .filter((oferta) => oferta.nome.includes(searchValueDebaunced))
        .map((oferta) => [
          <Box key="ativid" display="flex" flexDirection="column">
            <Typography variant="caption">{oferta.id}</Typography>
          </Box>,
          <Box key="oferta" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {oferta.turma.codigoTurma}
            </Typography>
            <Typography variant="caption">{oferta.turma.descricao}</Typography>
          </Box>,
          <Box key="turma-modulo" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {oferta.turma.descricao}
            </Typography>
            <Typography variant="caption">{oferta.modulo.nome}</Typography>
          </Box>,
          <Box key="periodo" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              ANO
            </Typography>
            <Typography variant="caption">
              {oferta.semestre_descricao}
            </Typography>
          </Box>,
          <Box key="inicio-fim" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {format(new Date(oferta.dataInicio), 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="caption">
              {format(new Date(oferta.dataFim), 'dd/MM/yyyy')}
            </Typography>
          </Box>,
          <Box key="ch" display="flex" flexDirection="column">
            <Typography variant="caption">{`${oferta.cargahoraria} h`}</Typography>
          </Box>,
          <Box key="encerramento" display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
              {oferta.encerramento || '-'}
            </Typography>
          </Box>,
          <Box key="lancamentos" display="flex" justifyContent="flex-end">
            <CustonIconButton
              tooltipTitle="Registro de faltas"
              onClick={() => handlerGoToRegistrofaltas(oferta.id)}
            >
              <EventAvailableIcon />
            </CustonIconButton>
            <CustonIconButton
              tooltipTitle="Registro de notas"
              onClick={() => console.log('teste')}
            >
              <LibraryAddSharpIcon />
            </CustonIconButton>
            <CustonIconButton
              tooltipTitle="Registro de faltas"
              onClick={() => console.log('teste')}
            >
              <UpdateIcon />
            </CustonIconButton>
          </Box>,
        ]);
    }
    return [];
  };

  return (
    <GenericContent
      helmetText="Ofertas | Sagu"
      title={'Ofertas da Turma'}
      letfTitleContent={
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      }
    >
      <TurmaInfo
        cod={turma?.codigoTurma}
        nome={turma?.descricao}
        inicio={turma?.dataInicio}
        fim={turma?.dataFim}
      />
      <SimpleTable
        title="Ofertas"
        onClickFilterButton={() => setOpen(true)}
        headCells={[
          'Ativid.',
          'Oferta',
          'Turma / Modulo',
          'Período',
          'Início/Fim',
          'CH',
          'Encerramentos',
          'Lançamentos',
        ]}
        rows={handleRows()}
      />
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
    </GenericContent>
  );
};

export default TurmaDetails;
