import { Meta, Story } from '@storybook/react';
import CHPendentesInfo, {
  CHPendentesInfoProps,
} from 'src/components/CHPendentesInfo';

export default {
  title: 'Components/CHPendentesInfo',
  component: CHPendentesInfo,
  argTypes: {
    data: {
      description: 'Objeto do tipo `CHPendentesInfoData`',
    },
  },
} as Meta;

const Template: Story<CHPendentesInfoProps> = (args) => (
  <CHPendentesInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    pratica: 10,
    teoricoConceitual: 10,
    teoricoPratica: 10,
  },
};
