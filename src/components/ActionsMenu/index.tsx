import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButtonProps,
} from '@material-ui/core';
import { ReactNode, useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { uniqueId } from 'lodash';

interface ActionsMenuData {
  label: string;
  icon?: ReactNode;
  action?(): void;
}

export interface ActionsMenuProps extends IconButtonProps {
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
      <IconButton
        {...rest}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>
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
