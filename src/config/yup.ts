import * as yup from 'yup';

const translation = {
  mixed: {
    default: 'Campo inválido',
    required: 'Campo obrigatório',
    oneOf: 'Esse campo deve ter um dos seguintes valores: ${values}',
    notOneOf: 'Esse campo não pode ter um dos seguintes valores: ${values}',
  },
  string: {
    length: 'Esse campo deve ter exatamente ${length} caracteres',
    min: 'Esse campo deve ter pelo menos ${min} caracteres',
    max: 'Esse campo deve ter no máximo ${max} caracteres',
    email: 'Esse campo tem o formato de e-mail inválido',
    url: 'Esse campo deve ter um formato de URL válida',
    trim: 'Esse campo não deve conter espaços no início ou no fim.',
    lowercase: 'Esse campo deve estar em maiúsculo',
    uppercase: 'Esse campo deve estar em minúsculo',
  },
  number: {
    min: 'Esse campo deve ter no mínimo ${min}',
    max: 'Esse campo deve ter no máximo ${max}',
    lessThan: 'Esse campo deve ser menor que ${less}',
    moreThan: 'Esse campo deve ser maior que ${more}',
    notEqual: 'Esse campo não pode ser igual à ${notEqual}',
    positive: 'Esse campo deve ser um número posítivo',
    negative: 'Esse campo deve ser um número negativo',
    integer: 'Esse campo deve ser um número inteiro',
    typeError: 'Esse campo deve ser um número',
  },
  date: {
    min: 'Esse campo deve ser maior que a data ${min}',
    max: 'Esse campo deve ser menor que a data ${max}',
  },
  array: {
    min: 'Esse campo deve ter no mínimo ${min} item(s)',
    max: 'Esse campo deve ter no máximo ${max} item(s)',
  },
};

yup.setLocale(translation);

export default yup;
