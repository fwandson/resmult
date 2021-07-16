import {
  GridLocaleText,
  GRID_DEFAULT_LOCALE_TEXT,
} from '@material-ui/data-grid';

const toolbarFiltersTooltipActive = (count: number) =>
  count !== 1 ? `${count} filtros ativos` : `${count} filtros ativos`;

// reference ==> https://github.com/mui-org/material-ui-x/blob/HEAD/packages/grid/_modules_/grid/constants/localeTextConstants.ts
const CUSTOM_GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  ...GRID_DEFAULT_LOCALE_TEXT,
  // Root
  noRowsLabel: 'Sem linhas',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',
  errorOverlayDefaultLabel: 'Um erro ocorreu.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Padão',
  toolbarDensityComfortable: 'Confortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Colunas selecionadas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Ver filtros',
  toolbarFiltersTooltipHide: 'Esconder filtros',
  toolbarFiltersTooltipShow: 'Ver filtros',
  toolbarFiltersTooltipActive,

  // Columns panel text
  columnsPanelTextFieldLabel: 'Encontrar coluna',
  columnsPanelTextFieldPlaceholder: 'Título da coluna',
  columnsPanelDragIconLabel: 'Reordenar coluna',
  columnsPanelShowAllButton: 'Mostrar todas',
  columnsPanelHideAllButton: 'Esconder todas',

  // Filter panel text
  filterPanelAddFilter: 'Add Filtro',
  filterPanelDeleteIconLabel: 'Delete',
  filterPanelOperators: 'Operadores',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Filtrar valor',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'igual',
  filterOperatorStartsWith: 'inicia com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'é depois',
  filterOperatorOnOrAfter: 'é em ou depois',
  filterOperatorBefore: 'é antes',
  filterOperatorOnOrBefore: 'está ligado ou antes',
  filterOperatorIsEmpty: 'está vazio',
  filterOperatorIsNotEmpty: 'não está vazio',

  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Hide',
  columnMenuUnsort: 'Unsort',
  columnMenuSortAsc: 'Classificar por ASC',
  columnMenuSortDesc: 'Classificar por DESC',

  // Total rows footer text
  footerTotalRows: 'Total de linhas:',
};

export { CUSTOM_GRID_DEFAULT_LOCALE_TEXT };
