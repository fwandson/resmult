import { useState } from 'react';
import CONSTANTS from 'src/config';
import jwt from 'jsonwebtoken';

const { LH_TOKEN_NAME } = CONSTANTS;

export interface UserInforData {
  nome: string;
  perfil: number;
  personid: number;
  supervisorid: number;
}

function useUserInfo(): UserInforData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<UserInforData>(() => {
    const token = localStorage.getItem(LH_TOKEN_NAME);

    if (token) {
      const { data } = jwt.decode(token) as { data: UserInforData };

      // TODO: remover
      console.table(data);

      return data;
    }

    return {} as UserInforData;
  });

  return user;
}

export default useUserInfo;
