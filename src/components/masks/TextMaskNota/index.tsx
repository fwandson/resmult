/* eslint-disable @typescript-eslint/no-explicit-any */
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

interface TextMaskNotaProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const TextMaskNota: React.FC<TextMaskNotaProps> = (props) => {
  const { inputRef, ...rest } = props;

  const mask = createNumberMask({
    integerLimit: 2,
    allowDecimal: true,
    decimalLimit: 1,
    prefix: '',
  });

  return (
    <MaskedInput
      {...rest}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
      mask={mask}
    />
  );
};

export default TextMaskNota;
