import { Box, Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import AddCHComplementarModal from 'src/components/modals/AddCHComplementarModal';
import { FiltrosOfertasModalProps } from 'src/components/modals/FiltrosOfertasModal';
import { GetResidentesNames } from 'src/resources/turmas/types';
export default {
  title: 'Components/AddCHComplementarModal',
  component: AddCHComplementarModal,
} as Meta;

const Template: Story<FiltrosOfertasModalProps> = () => {
  const [open, setOpen] = useState(false);

  // Exemplo de residente data
  const residente = {
    id: 751,
    inicio: '2020-03-02',
    fimPrevisto: '2022-02-28',
    person: {
      id: 39798,
      name: 'ADÉLIA LISBOA TELES DE MENEZES',
      photoid: 6456,
      photourl:
        'http://localhost:81/miolo20/html/index.php?module=basic&action=main:getfile&&fileId=6456',
    },
    enfase: {
      id: 11,
      descricao: 'PEDIATRIA',
    },
    nucleoProfissional: {
      id: 8,
      descricao: 'NUTRIÇÃO',
    },
    turma: {
      descricao: 'TURMA VII',
    },
    instituicaoFormadoraPerson: {
      name: 'ESCOLA DE SAÚDE PÚBLICA DO CEARÁ',
    },
    instituicaoExecutoraPerson: {
      name: 'INSTITUTO DOUTOR JOSÉ FROTA - IJF',
    },
    faltas: [
      {
        id: 10094,
        residenteId: 751,
        ofertaId: 315,
        tipo: 'C',
        falta: '40',
        observacao: 'Covid',
      },
      {
        id: 10093,
        residenteId: 751,
        ofertaId: 315,
        tipo: 'P',
        falta: '20',
        observacao: 'Alguma coisa',
      },
      {
        id: 10095,
        residenteId: 751,
        ofertaId: 315,
        tipo: 'T',
        falta: '30',
        observacao: 'Faltou por motivo Y',
      },
    ],
    nota: {
      id: 9198,
      residenteId: 751,
      ofertaId: 315,
      semestre: 1,
      notaDeAtividadeDeProduto: '8',
      notaDeAvaliacaoDeDesempenho: '10',
    },
    cargahorariapendente: 20,
    cargahorariacomplementar: [
      {
        id: 12349,
        tipoCargaHorariaComplementar: {
          id: 2,
          descricao: 'PLANTÃO',
        },
        residente: 751,
        oferta: 315,
        cargaHoraria: '50',
        justificativa: 'ALGUMA COISA PARA TESTAR',
        tipoCargaHoraria: 'P',
      },
      {
        id: 12350,
        tipoCargaHorariaComplementar: {
          id: 2,
          descricao: 'PLANTÃO',
        },
        residente: 751,
        oferta: 315,
        cargaHoraria: '20',
        justificativa: null,
        tipoCargaHoraria: 'C',
      },
    ],
  } as GetResidentesNames.Residente;

  return (
    <Box>
      <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>
      <Box m={2} />
      <AddCHComplementarModal
        idTurma={12}
        idOferta={12}
        open={open}
        setOpen={setOpen}
        residente={residente}
        mutate={() => {
          console.log('mutate');
        }}
      />
    </Box>
  );
};

export const Default = Template.bind({});
