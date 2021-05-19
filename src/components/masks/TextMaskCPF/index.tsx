/* eslint-disable @typescript-eslint/no-explicit-any */
import MaskedInput from 'react-text-mask';

interface TextMaskCPFProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const TextMaskCPF: React.FC<TextMaskCPFProps> = (props) => {
  const { inputRef, ...rest } = props;

  return (
    <MaskedInput
      {...rest}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]}
    />
  );
};

export default TextMaskCPF;
