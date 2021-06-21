import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import NAMES from 'src/routes/names';

export interface ResidenteAvatar {
  idTurma: number;
  idOferta: number;
  idResidente: number;
  nomeResidente: string;
}

const ResidenteAvatar: React.FC<ResidenteAvatar> = (props) => {
  const { idTurma, idOferta, idResidente, nomeResidente } = props;

  return (
    <Avatar
      component={LinkRouter}
      to={NAMES.RESIDENTE_DETAILS.replace(':idTurma', String(idTurma))
        .replace(':idOferta', String(idOferta))
        .replace(':idResidente', String(idResidente))}
      src={`/static/images/avatars/avatar_${(idResidente % 11) + 1}.png`}
    >
      {nomeResidente}
    </Avatar>
  );
};

export default ResidenteAvatar;
