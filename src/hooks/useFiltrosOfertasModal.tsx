/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

function useFiltrosOfertasModal<T extends { [key: string]: any }>(
  initialData: T,
  initalOpen = false
) {
  const [open, setOpen] = useState(initalOpen);

  const [filtros, setFiltros] = useState<T>(initialData);

  const handleOnChange = (name: string, value: any) => {
    setFiltros((old) => ({
      ...old,
      [name]: value,
    }));
  };

  return { filtros, handleOnChange, open, setOpen };
}

export default useFiltrosOfertasModal;
