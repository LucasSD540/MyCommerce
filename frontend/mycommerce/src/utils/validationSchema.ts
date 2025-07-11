import * as Yup from "yup";

export const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Digite sua senha"),
});

export const validationSchemaRegister = Yup.object({
  first_name: Yup.string().required("Campo obrigatório"),
  last_name: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  email: Yup.string()
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Senha obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

export const validationSchemaChangeInfo = Yup.object({
  first_name: Yup.string().required("Campo obrigatório"),
});

export const validationSchemaChangePassword = Yup.object({
  current_password: Yup.string().required("Senha obrigatória"),
  new_password: Yup.string().required("Senha obrigatória"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

export const validationSchemaAddress = Yup.object({
  cep: Yup.string().required("CEP obrigatório"),
  neighborhood: Yup.string().required("Campo obrigatório"),
  city: Yup.string().required("Campo obrigatório"),
  state: Yup.string().required("Campo obrigatório"),
  addon: Yup.string().required("Campo obrigatório"),
});
