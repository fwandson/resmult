import { Button, ButtonProps, CircularProgress } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useRef, useState } from 'react';

interface DoubleConfirmButtonProps extends Omit<ButtonProps, 'onClick'> {
  isLoading?: boolean;
  delay: number;
  handleConfirm(): void;
}

const DoubleConfirmButton: React.FC<DoubleConfirmButtonProps> = (props) => {
  const {
    isLoading,
    delay,
    handleConfirm,
    children,
    startIcon,
    color,
    ...rest
  } = props;

  const [toConfirm, setToConfirm] = useState(false);

  const timeOutCountRef = useRef<NodeJS.Timeout>({} as NodeJS.Timeout);

  const handleOnClick = () => {
    if (!toConfirm) {
      setToConfirm(true);
      timeOutCountRef.current = setTimeout(() => {
        setToConfirm(false);
      }, delay);
    } else {
      handleConfirm();
      clearTimeout(timeOutCountRef.current);
      setToConfirm(false);
    }
  };

  const handleIcon = () => {
    if (toConfirm) {
      return <HelpOutlineIcon />;
    }
    return isLoading ? <CircularProgress size={20} /> : startIcon;
  };

  return (
    <Button
      {...rest}
      startIcon={handleIcon()}
      onClick={handleOnClick}
      color={toConfirm ? 'secondary' : color}
    >
      {toConfirm ? 'Confirmar' : children}
    </Button>
  );
};

export default DoubleConfirmButton;
