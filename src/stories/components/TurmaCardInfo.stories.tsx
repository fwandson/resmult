import { Meta, Story } from '@storybook/react';
import TurmaCardInfo, {
  TurmaCardInfoProps,
} from 'src/components/TurmaCardInfo';

export default {
  title: 'Components/TurmaCardInfo',
  component: TurmaCardInfo,
  argTypes: {
    data: {
      description: 'Objeto das informações da Turma',
    },
  },
} as Meta;

const Template: Story<TurmaCardInfoProps> = (args) => (
  <TurmaCardInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 13,
    codigoTurma: 'T7HOSPITALAR',
    descricao: 'TURMA VII',
    dataInicio: '02/03/2020',
    dataFim: '28/02/2022',
    quantidadeperiodo: 2,
    componente: 'HOSPITALAR',
  },
};
