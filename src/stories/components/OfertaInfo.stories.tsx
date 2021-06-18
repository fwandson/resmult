import { Meta, Story } from '@storybook/react';
import OfertaInfo, { OfertaInfoProps } from 'src/components/OfertaInfo';

export default {
  title: 'Components/OfertaInfo',
  component: OfertaInfo,
  argTypes: {
    id: {
      description: 'Id da Oferta',
    },
    nome: {
      description: 'Nome da Oferta',
    },
    periodo: {
      description: 'Período da Oferta',
    },
    cargaHoraria: {
      description: 'Carga Horária da Oferta',
    },
    cod: {
      description: 'Código da Oferta',
    },
    inicio: {
      description: 'Data inicial',
      control: {
        type: 'date',
      },
    },
    fim: {
      description: 'Data final',
      control: {
        type: 'date',
      },
    },
  },
} as Meta;

const Template: Story<OfertaInfoProps> = (args) => <OfertaInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 10,
  cod: 'T2HOSPITALAR',
  nome: 'Turma II',
  inicio: new Date(),
  fim: new Date(),
  periodo: 'Primeiro ano',
  cargaHoraria: '1000',
};
