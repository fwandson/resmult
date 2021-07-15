import { DataGrid, DataGridProps } from '@material-ui/data-grid';

// Colocando aqui pq eu posso querer customizar esse component
const CustomTable: React.FC<DataGridProps> = (props) => {
  const { ...rest } = props;

  return <DataGrid {...rest} />;
};

export default CustomTable;
