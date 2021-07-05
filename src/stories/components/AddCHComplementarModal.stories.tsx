import { Box, Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import AddCHComplementarModal from 'src/components/modals/AddCHComplementarModal';
import { FiltrosOfertasModalProps } from 'src/components/modals/FiltrosOfertasModal';

export default {
  title: 'Components/AddCHComplementarModal',
  component: AddCHComplementarModal,
} as Meta;

const Template: Story<FiltrosOfertasModalProps> = () => {
  const [open, setOpen] = useState(false);

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
        residente={undefined}
        mutate={() => {
          console.log('mutate');
        }}
      />
    </Box>
  );
};

export const Default = Template.bind({});
