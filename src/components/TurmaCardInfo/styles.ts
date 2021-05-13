import styled from 'styled-components';
import { CardActions as CardActionsMUI } from '@material-ui/core';

export const CardActions = styled(CardActionsMUI)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const DatesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;