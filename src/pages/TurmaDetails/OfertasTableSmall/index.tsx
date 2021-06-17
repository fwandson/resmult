import SimpleTable from 'src/components/SimpleTable';

const OfertasTableSmall: React.FC = () => {
  return (
    <SimpleTable
      title="Lista de ofertas"
      //onClickFilterButton={() => setOpen(true)}
      //chips={handleChips()}
      hideTablePagination
      headCells={[
        {
          value: 'Oferta',
          align: 'left',
        },
        {
          value: 'Período',
          align: 'left',
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

export default OfertasTableSmall;
