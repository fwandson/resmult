import { Box, Button, Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import FiltrosOfertasModal, {
  FiltrosOfertasModalProps,
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import useFiltrosModal from 'src/hooks/useFiltrosModal';
export default {
  title: 'Components/FiltrosOfertasModal',
  component: FiltrosOfertasModal,
} as Meta;

const Template: Story<FiltrosOfertasModalProps> = () => {
  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosModal<FiltrosOfertasModalData>({
    turma: 0,
    periodo: '',
    nucleo: 0,
    enfase: 0,
    inicio: new Date(),
    fim: new Date(),
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
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
    </>
  );
};

export const Default = Template.bind({});
