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
import { useState } from 'react';
import { CUSTOM_GRID_DEFAULT_LOCALE_TEXT } from 'src/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface CustomTableProps
  extends Omit<
    DataGridProps,
    | 'components'
    | 'componentsProps'
    | 'localeText'
    | 'pageSize'
    | 'rowsPerPageOptions'
    | 'disableSelectionOnClick'
    | 'autoHeight'
    | 'disableColumnMenu'
  > {
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

  const [pageSize, setPageSize] = useState(5);

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  return (
    <DataGrid
      {...rest}
      className={classes.root}
      disableSelectionOnClick
      autoHeight
      disableColumnMenu
      components={{
        Toolbar: CustomToolbar,
      }}
      componentsProps={{
        toolbar: {
          title,
        },
      }}
      localeText={CUSTOM_GRID_DEFAULT_LOCALE_TEXT}
      pageSize={pageSize}
      onPageSizeChange={handlePageSizeChange}
      rowsPerPageOptions={[5, 10, 25, 50]}
    />
  );
};

export default CustomTable;
