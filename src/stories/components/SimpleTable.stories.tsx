import { Meta, Story } from '@storybook/react';
import SimpleTable, { SimpleTableProps } from 'src/components/SimpleTable';

export default {
  title: 'Components/SimpleTable',
  component: SimpleTable,
  argTypes: {
    title: {
      description: 'Título apresentado na `Table`',
    },
    headCells: {
      description: 'Células do cabeçario',
      type: 'object',
    },
    rows: {
      description: 'Linhas',
      type: 'array',
    },
  },
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
