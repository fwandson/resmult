/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { FiltrosModalData } from 'src/components/modals/FiltrosModal';

// TODO: deixar isso aqui customizável usando <T>
function useFiltrosModal(initialData: FiltrosModalData, initalOpen = false) {
  const [open, setOpen] = useState(initalOpen);

  const [filtros, setFiltros] = useState<FiltrosModalData>(initialData);

  const handleOnChange = (name: string, value: any) => {
    setFiltros((old) => ({
      ...old,
      [name]: value,
    }));
  };

  return { filtros, handleOnChange, open, setOpen };
}

export default useFiltrosModal;
