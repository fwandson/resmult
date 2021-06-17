import SimpleTable, { SimpleTableProps } from 'src/components/SimpleTable';

const OfertasTable: React.FC<SimpleTableProps> = () => {
  return (
    <SimpleTable
      title="Lista de ofertas"
      //onClickFilterButton={() => setOpen(true)}
      //chips={handleChips()}
      headCells={[
        {
          value: '#Id',
          align: 'left',
        },
        {
          value: 'Oferta',
          align: 'left',
        },
        {
          value: 'Turma / Modulo',

          align: 'left',
        },
        {
          value: 'Período',
          align: 'left',
        },
        {
          value: 'Início/Fim',
          align: 'left',
        },
        {
          value: 'CH',
          align: 'center',
        },
        {
          value: 'Encerramento',
          align: 'center',
        },
        {
          value: 'Lançamentos',
          align: 'right',
        },
      ]}
      // rows={handleRows()}
      rows={[]}
    />
  );
};

export default OfertasTable;
