import { Meta, Story } from '@storybook/react';
import TurmaInfo, { TurmaInfoProps } from 'src/components/TurmaInfo';

export default {
  title: 'Components/TurmaInfo',
  component: TurmaInfo,
  argTypes: {
    id: {
      description: 'Id da Turma',
    },
    nome: {
      description: 'Nome da Turma',
    },
    cod: {
      description: 'Descrução da Turma',
    },
    inicio: {
      description: 'Data de início da Turma',
      control: {
        type: 'date',
      },
    },
    fim: {
      description: 'Data de fim da Turma',
      control: {
        type: 'date',
      },
    },
  },
} as Meta;

const Template: Story<TurmaInfoProps> = (args) => <TurmaInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 19,
  cod: 'T2HOSPITALAR',
  nome: 'Turma II',
  inicio: '20/20/2020',
  fim: '21/21/2021',
};
