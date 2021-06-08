import { render } from '@testing-library/react';
import SimpleTable from 'src/components/SimpleTable';

const title = 'Alunos';

const headCells = ['Nome', 'Idade', 'Sexo'];

const rows = [
  ['Ericson', 33, 'M'],
  ['Marilia', 28, 'F'],
];

describe('components/SimpleTable', () => {
  test('create', async () => {
    const { getByText } = render(
      <SimpleTable title={title} headCells={headCells} rows={rows} />
    );

    // verificando title
    expect(getByText(title));

    // verificando head cells
    headCells.forEach((cell) => expect(getByText(cell)));

    // verificando rows cells
    rows.forEach((row) => row.forEach((cell) => expect(getByText(cell))));
  });
});

export {};
