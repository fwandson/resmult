import { Avatar } from '@material-ui/core';
import React, { memo } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import NAMES from 'src/routes/names';

export interface ResidenteAvatarProps {
  idTurma: number;
  idOferta: number;
  idResidente: number;
  nomeResidente: string;
  photourl: string | undefined;
}

const ResidenteAvatar: React.FC<ResidenteAvatarProps> = (props) => {
  const { idTurma, idOferta, idResidente, nomeResidente, photourl } = props;

  return (
    <Avatar
      component={LinkRouter}
      to={NAMES.RESIDENTE_DETAILS.replace(':idTurma', String(idTurma))
        .replace(':idOferta', String(idOferta))
        .replace(':idResidente', String(idResidente))}
      src={photourl}
    >
      {nomeResidente}
    </Avatar>
  );
};

export default memo(ResidenteAvatar);
