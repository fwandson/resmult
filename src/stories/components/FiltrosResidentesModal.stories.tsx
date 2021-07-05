import { Box, Button, Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import FiltrosResidentesModal, {
  FiltrosResidentesModalData,
  FiltrosResidentesModalProps,
} from 'src/components/modals/FiltrosResidentesModal';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
export default {
  title: 'Components/FiltrosResidentesModal',
  component: FiltrosResidentesModal,
} as Meta;

const enfases = [
  {
    id: 2,
    descricao: 'SAÚDE DA FAMÍLIA E COMUNIDADE',
    abreviatura: 'SF',
  },
  {
    id: 3,
    descricao: 'SAÚDE MENTAL COLETIVA',
    abreviatura: 'SM',
  },
  {
    id: 4,
    descricao: 'SAÚDE COLETIVA',
    abreviatura: 'SC',
  },
  {
    id: 5,
    descricao: 'CANCEROLOGIA',
    abreviatura: 'CANC',
  },
  {
    id: 6,
    descricao: 'CARDIOPNEUMOLOGIA',
    abreviatura: 'CARD',
  },
  {
    id: 7,
    descricao: 'ENFERMAGEM OBSTÉTRICA',
    abreviatura: 'OBST',
  },
  {
    id: 8,
    descricao: 'INFECTOLOGIA',
    abreviatura: 'INFE',
  },
];

const Template: Story<FiltrosResidentesModalProps> = () => {
  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosResidentesModalData>({
    enfase: '',
  });

  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>
      <Box m={2} />
      <Typography>
        <pre>{JSON.stringify(filtros, null, 2)}</pre>
      </Typography>
      <FiltrosResidentesModal
        setOpen={setOpen}
        filtros={filtros}
        enfases={enfases}
        {...rest}
      />
    </>
  );
};

export const Default = Template.bind({});
