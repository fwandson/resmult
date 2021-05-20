import styled from 'styled-components';

import theme from 'src/theme';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${theme.palette.background.default};
  overflow: hidden;
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex: 2;
  padding: ${theme.spacing(8)}px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  background-color: ${theme.palette.primary.main};
`;
