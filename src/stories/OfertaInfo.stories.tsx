import { Meta, Story } from '@storybook/react';
import OfertaInfo, { OfertaInfoProps } from 'src/components/OfertaInfo';

export default {
  title: 'Components/OfertaInfo',
  component: OfertaInfo,
} as Meta;

const Template: Story<OfertaInfoProps> = (args) => <OfertaInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  cod: 'T2HOSPITALAR',
  nome: 'Turma II',
  inicio: '20/20/2020',
  fim: '21/21/2021',
  periodo: 'Primeiro ano',
  cargaHoraria: '1000h',
};
