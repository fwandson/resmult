import { Box } from '@material-ui/core';
import styled from 'styled-components';

export const ContainerWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  text-align: center;
  img {
    margin-top: 50px;
    display: inline-block;
    max-width: 100%;
    width: 500px;
  }
`;
