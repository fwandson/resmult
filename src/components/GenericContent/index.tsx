import { Box, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import IconButtonBack from '../IconButtonBack';
import LoadingBackdrop from '../LoadingBackdrop';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export interface GenericContentProps {
  helmetText: string;
  title: string;
  letfTitleContent?: ReactNode;
  isLoading?: boolean;
}

const GenericContent: React.FC<GenericContentProps> = ({
  children,
  helmetText,
  title,
  letfTitleContent,
  isLoading = false,
}) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Helmet>
        <title>{helmetText}</title>
      </Helmet>
      <Box>
        <IconButtonBack edge="start" />
      </Box>
      <Box
        marginBottom={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h1">{title}</Typography>
        {letfTitleContent}
      </Box>
      <Box>{children}</Box>
      <LoadingBackdrop isLoading={isLoading} />
    </Box>
  );
};

export default GenericContent;
