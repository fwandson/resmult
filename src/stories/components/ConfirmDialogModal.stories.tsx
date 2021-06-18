import { Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import ConfirmDialogModal, {
  ConfirmDialogModalProps,
} from 'src/components/modals/ConfirmDialogModal';

export default {
  title: 'Components/ConfirmDialogModal',
  component: ConfirmDialogModal,
  argTypes: {
    title: {
      description: 'Título',
    },
    contentText: {
      description: 'Texto do conteudo',
    },
    handleConfirm: {
      description: '`function` disparada quando clicar no botão de confirmar',
    },
  },
} as Meta;

const Template: Story<ConfirmDialogModalProps> = (props) => {
  const { title, contentText } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>
      <ConfirmDialogModal
        open={open}
        setOpen={setOpen}
        title={title}
        contentText={contentText}
        handleConfirm={() => setOpen(false)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Mussum Ipsum, cacilds vidis litro abertis',
  contentText:
    'Mussum Ipsum, cacilds vidis litro abertis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Diuretics paradis num copo é motivis de denguis. Suco de cevadiss deixa as pessoas mais interessantis. Leite de capivaris, leite de mula manquis sem cabeça.',
};
