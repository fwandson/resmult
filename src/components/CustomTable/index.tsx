import {
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {
  DataGrid,
  DataGridProps,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@material-ui/data-grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface CustomTableProps extends DataGridProps {
  title: string;
}

interface CustomToolbarProps {
  title: string;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ title }) => {
  return (
    <GridToolbarContainer>
      <Box m={1} mt={2}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </Box>
    </GridToolbarContainer>
  );
};

const CustomTable: React.FC<CustomTableProps> = (props) => {
  const { title, ...rest } = props;

  const classes = useStyles();

  const Toolbar = () => <CustomToolbar title={title} />;

  return (
    <DataGrid
      {...rest}
      className={classes.root}
      disableSelectionOnClick
      autoHeight
      disableColumnMenu
      components={{
        Toolbar,
      }}
    />
  );
};

export default CustomTable;
