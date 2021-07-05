import styled from 'styled-components';
import { CardActions as CardActionsMUI, Chip } from '@material-ui/core';
import theme from 'src/theme';

export const CardActions = styled(CardActionsMUI)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ChipInicio = styled(Chip)`
  color: ${theme.palette.primary.dark};
  border-color: ${theme.palette.primary.dark};
`;

export const ChipFim = styled(Chip)`
  color: ${theme.palette.error.main};
  border-color: ${theme.palette.error.main};
`;
