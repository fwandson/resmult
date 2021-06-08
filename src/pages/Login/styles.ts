import { Box, Container as ContainerMUI } from '@material-ui/core';
import styled from 'styled-components';

export const ContainerWrapper = styled(Box)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(ContainerMUI)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 50px 25px;

  img {
    height: 30px;
    width: 112px;
  }

  a {
    color: #FFF;
  }
`;

export const FormLogin = styled.form`
  padding: 10px;
`;
