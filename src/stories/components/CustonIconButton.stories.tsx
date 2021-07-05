import { Meta, Story } from '@storybook/react';
import CustonIconButton, {
  CustonIconButtonProps,
} from 'src/components/CustonIconButton';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

export default {
  title: 'Components/CustonIconButton',
  component: CustonIconButton,
  argTypes: {
    tooltipTitle: {
      description: 'Texto apresentado como `Dica`',
    },
  },
} as Meta;

const Template: Story<CustonIconButtonProps> = (args) => (
  <CustonIconButton {...args}>
    <EventAvailableIcon />
  </CustonIconButton>
);

export const Default = Template.bind({});
Default.args = {
  tooltipTitle: 'Dica',
};
