import * as Yup from 'yup'

const fields: {
  id: string
  label: string
  defaultValue: string | number
  type: string
  rules: Yup.Maybe<Yup.AnyObject>
}[] = [
  {
    id: 'first_name',
    label: 'Имя',
    defaultValue: '',
    type: 'text',
    rules: Yup.string()
      .matches(
        /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/g,
        'Первая буква должна быть заглавной, не допустимы цифры или спецсимволы'
      )
      .required('Обязательно для заполнения'),
  },
  {
    id: 'second_name',
    label: 'Фамилия',
    defaultValue: '',
    type: 'text',
    rules: Yup.string()
      .matches(
        /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/g,
        'Первая буква должна быть заглавной, не допустимы цифры или спецсимволы'
      )
      .required('Обязательно для заполнения'),
  },
  {
    id: 'login',
    label: 'Никнейм',
    defaultValue: '',
    type: 'text',
    rules: Yup.string()
      .required('Обязательно для заполнения')
      .matches(
        /^(?![\d+_@.-]+$)[a-zA-Zа-яА-Я0-9+_@.-]*$/g,
        'Логин не должен содержать спецсимволы или состоять только из цифр'
      )
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
  },
  {
    id: 'password',
    label: 'Пароль',
    defaultValue: '',
    type: 'password',
    rules: Yup.string()
      .min(8, 'Минимум 8 символов')
      .max(40, 'Максимум 40 символов')
      .matches(/[0-9]/g, 'Необходима одна цифра')
      .matches(/[A-ZА-Я]/g, 'Необходим один заглавный символ')
      .required('Обязательно для заполнения'),
  },
  {
    id: 'email',
    label: 'Email',
    defaultValue: '',
    type: 'text',
    rules: Yup.string()
      .email('Некорректная почта')
      .required('Обязательно для заполнения'),
  },
  {
    id: 'phone',
    label: 'Телефон',
    defaultValue: '',
    type: 'number',
    rules: Yup.string()
      .matches(/^\+?\d{10,15}$/g, 'От 10 до 15 цифр, может содержать плюс')
      .typeError('Должен содержать цифры')
      .required('Обязательно для заполнения'),
  },
]

export default fields
