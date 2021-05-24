import { Box, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface GenericContentProps {
  helmetText: string;
  title: string;
}

const GenericContent: React.FC<GenericContentProps> = ({
  children,
  helmetText,
  title,
}) => {
  return (
    <Container>
      <Helmet>
        <title>{helmetText}</title>
      </Helmet>
      <Box marginBottom={4}>
        <Typography variant="h1">{title}</Typography>
      </Box>
      {children}
    </Container>
  );
};

export default GenericContent;
