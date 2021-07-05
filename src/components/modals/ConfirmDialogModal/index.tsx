import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ConfirmDialogModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  contentText: string | ReactNode;
  handleConfirm(): void;
}

const ConfirmDialogModal: React.FC<ConfirmDialogModalProps> = (props) => {
  const { open, setOpen, title, contentText, handleConfirm, ...rest } = props;

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">{title}</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button
          onClick={() => {
            setOpen(false);
            handleConfirm();
          }}
          color="secondary"
          autoFocus
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogModal;
