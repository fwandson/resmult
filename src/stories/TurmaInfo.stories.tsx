import { Meta, Story } from '@storybook/react';
import TurmaInfo, { TurmaInfoProps } from 'src/components/TurmaInfo';

export default {
  title: 'Components/TurmaInfo',
  component: TurmaInfo,
} as Meta;

const Template: Story<TurmaInfoProps> = (args) => <TurmaInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  cod: 'T2HOSPITALAR',
  nome: 'Turma II',
  inicio: '20/20/2020',
  fim: '21/21/2021',
};
