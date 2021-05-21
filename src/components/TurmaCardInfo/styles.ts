import styled, { css } from 'styled-components';
import { CardActions as CardActionsMUI, Chip } from '@material-ui/core';
import theme from 'src/theme';

export const CardActions = styled(CardActionsMUI)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const wrapper = css`
  display: flex;
  flex-direction: row;
  // todos os filhos, menos o primeiro
  > :not(:first-child) {
    margin-left: 8px;
  }
`;

export const DatesWrapper = styled.div`
  ${wrapper}
`;

export const InfoWrapper = styled.span`
  ${wrapper}
  margin-bottom: 16px;
`;

export const ChipInicio = styled(Chip)`
  color: ${theme.palette.primary.dark};
  border-color: ${theme.palette.primary.dark};
`;

export const ChipFim = styled(Chip)`
  color: ${theme.palette.error.main};
  border-color: ${theme.palette.error.main};
`;
