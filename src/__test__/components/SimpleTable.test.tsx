import { render } from '@testing-library/react';
import SimpleTable from 'src/components/SimpleTable';

const title = 'Alunos';

const rows = [
  ['Ericson', 33, 'M'],
  ['Marilia', 28, 'F'],
];

describe('components/SimpleTable', () => {
  test('create', async () => {
    const { getByText } = render(
      <SimpleTable
        title={title}
        headCells={[
          { value: 'Nome', align: 'left' },
          { value: 'Idade', align: 'left' },
          { value: 'Sexo', align: 'right' },
        ]}
        rows={rows}
      />
    );

    // verificando title
    expect(getByText(title));

    // verificando rows cells
    rows.forEach((row) => row.forEach((cell) => expect(getByText(cell))));
  });
});

export {};
