import { Meta, Story } from '@storybook/react';
import ActionsMenu, { ActionsMenuProps } from 'src/components/ActionsMenu';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default {
  title: 'Components/ActionsMenu',
  component: ActionsMenu,
  argTypes: {
    data: {
      description: 'Informações a serem apresentadas',
      control: {
        type: 'object',
      },
    },
  },
} as Meta;

const Template: Story<ActionsMenuProps> = (args) => <ActionsMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  tooltipTitle: 'tooltipTitle',
  data: [{ label: 'Editar' }, { label: 'Salvar' }, { label: 'Deletar' }],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  tooltipTitle: 'tooltipTitle',
  data: [
    { label: 'Editar', icon: <EditIcon /> },
    { label: 'Salvar', icon: <SaveIcon /> },
    { label: 'Deletar', icon: <DeleteIcon /> },
  ],
};
