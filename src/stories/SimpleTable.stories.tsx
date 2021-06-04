import { Meta, Story } from '@storybook/react';
import SimpleTable, { SimpleTableProps } from 'src/components/SimpleTable';

export default {
  title: 'Components/SimpleTable',
  component: SimpleTable,
} as Meta;

const title = 'Residentes';

const rows = [
  ['Pessoa', 30, 'M'],
  ['Pessoa', 30, 'M'],
  ['Pessoa', 30, 'M'],
  ['Pessoa', 30, 'M'],
  ['Pessoa', 30, 'M'],
  ['Pessoa', 30, 'M'],
  ['Pessoa', 30, 'M'],
];

const Template: Story<SimpleTableProps> = (args) => <SimpleTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  title,
  headCells: [
    { value: 'Nome', align: 'left' },
    {
      value: 'Idade',
      align: 'left',
    },
    {
      value: 'Sexo',
      align: 'right',
    },
  ],
  rows,
};
