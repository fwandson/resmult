import { Meta, Story } from '@storybook/react';
import TurmaCardInfo, {
  TurmaCardInfoProps,
} from 'src/components/TurmaCardInfo';

export default {
  title: 'Components/TurmaCardInfo',
  component: TurmaCardInfo,
} as Meta;

const Template: Story<TurmaCardInfoProps> = (args) => (
  <TurmaCardInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  codigo: 'T2HOSPITALAR',
  nome: 'Turma || - Hospitalar',
  inicio: '20/05/2021',
  fim: '20/05/2021',
  numPeríodos: 2,
  numVagasOcupadas: 200,
};
