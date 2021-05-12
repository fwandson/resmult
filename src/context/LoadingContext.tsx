import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { createContext, useCallback, useContext, useState } from 'react';

interface LoadingContextState {
  isLoading: boolean;
  showLoading(): void;
  hideLoading(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.dark,
    },
  })
);

const LoadingContext = createContext<LoadingContextState>(
  {} as LoadingContextState
);

const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

function useLoading(): LoadingContextState {
  const context = useContext(LoadingContext);
  return context;
}

export { LoadingProvider, useLoading };
