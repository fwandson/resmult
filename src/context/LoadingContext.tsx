import { createContext, useCallback, useContext, useState } from 'react';
import LoadingBackdrop from 'src/components/LoadingBackdrop';

interface LoadingContextState {
  isLoading: boolean;
  showLoading(): void;
  hideLoading(): void;
}

const LoadingContext = createContext<LoadingContextState>(
  {} as LoadingContextState
);

const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      <LoadingBackdrop isLoading={isLoading} />
    </LoadingContext.Provider>
  );
};

function useLoading(): LoadingContextState {
  const context = useContext(LoadingContext);
  return context;
}

export { LoadingProvider, useLoading };
