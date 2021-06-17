import { ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { uniqueId } from 'lodash';
import { ReactNode, useState } from 'react';
import CustonIconButton, { CustonIconButtonProps } from '../CustonIconButton';

interface ActionsMenuData {
  label: string;
  icon?: ReactNode;
  action?(): void;
}

export interface ActionsMenuProps extends CustonIconButtonProps {
  data: ActionsMenuData[];
}

const ActionsMenu: React.FC<ActionsMenuProps> = (props) => {
  const { data, ...rest } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CustonIconButton
        {...rest}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddIcon />
      </CustonIconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {data.map(({ icon, label, action }) => (
          <MenuItem
            key={uniqueId()}
            onClick={() => {
              if (action) action();
            }}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}

            <Typography>{label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ActionsMenu;
