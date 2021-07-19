type TipoPedido = 'P1' | 'P2' | 'P3';

const handlePediodo = (tipoPedido: TipoPedido): string => {
  const periodos = {
    P1: 'Primeiro ano',
    P2: 'Segundo ano',
    P3: 'Terceiro type ano',
  };
  return periodos[tipoPedido];
};

export { handlePediodo };
