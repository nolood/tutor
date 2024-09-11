/* eslint-disable no-unused-vars */
// TODO: здесь только названия ошибок, уточнения типа пароль короткий, емайл не верный и т.д. в другом месте, также в enum не надо пихать сразу название ошибки, как я и говорил, енам с кодом ошибки, а саму ошибку доставать из объекта типа Record<EFormErrors, string>

export enum EFormErrors {
  REQUIRED = "required",
  MINLENGTH = "min_length",
  MAXLENGTH = "max_length",
  MISMATCH = "mismatch",
}
