import theme from 'src/theme';
import styled from 'styled-components';

export const Container = styled.div`
  &:hover {
    svg {
      color: ${theme.palette.secondary.main};
    }
  }
`;
