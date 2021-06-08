import { Meta, Story } from '@storybook/react';
import EmptyContentAlert, {
  EmptyContentAlertProps,
} from 'src/components/EmptyContentAlert';

export default {
  title: 'Components/EmptyContentAlert',
  component: EmptyContentAlert,
} as Meta;

const Template: Story<EmptyContentAlertProps> = (args) => (
  <EmptyContentAlert {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Sua lista de turmas está vazia!',
  subTitle:
    'Parece que não há turmas cadastradas em sue nome, verifique seu acesso com seu administrador',
};
