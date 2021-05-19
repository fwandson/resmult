import { createContext, useCallback, useContext, useState } from 'react';
import api from 'src/api';
import resources from 'src/resources';

// Local history
export const LH_TOKEN_NAME = '@Sagu:token';

interface AuthContextState {
  token: TokenState;
  signIn({ username, password }: UserData): Promise<void>;
  userLogged(): boolean;
  signOut(): void;
}

// provalvemente isso será cpf
interface UserData {
  username: string;
  password: string;
}

interface TokenState {
  token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem(LH_TOKEN_NAME);

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token };
    }

    return {} as TokenState;
  });

  const signIn = useCallback(async ({ username, password }: UserData) => {
    // TODO: Melhor transformar isso em um Hook
    const { autentication } = resources;

    const { data } = await autentication.login({
      usuario: username,
      senha: password,
    });

    const { access_token } = data;

    setToken({ token: access_token });

    // setando a local history da token
    localStorage.setItem(LH_TOKEN_NAME, access_token);

    // configurando o header do axios com a autorization JWT
    api.defaults.headers.authorization = `Bearer ${access_token}`;
  }, []);

  // implementando
  const signOut = useCallback(async () => {
    setToken({} as TokenState);
    localStorage.removeItem(LH_TOKEN_NAME);
    api.defaults.headers.authorization = undefined;
  }, []);

  const userLogged = useCallback(() => {
    const token = localStorage.getItem(LH_TOKEN_NAME);
    if (token) {
      return true;
    }
    return false;
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, userLogged, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
