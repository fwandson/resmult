import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const CustomTable: React.FC<DataGridProps> = (props) => {
  const { ...rest } = props;

  const classes = useStyles();

  return <DataGrid className={classes.root} {...rest} />;
};

export default CustomTable;
