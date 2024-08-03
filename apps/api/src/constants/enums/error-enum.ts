export enum ERROR {
  AUTH_ERR = "Ошибка авторизации",
  LOG_ERR_NOT_FOUND = "Пользователь не найден",
  LOG_ERR_PASS = "Пароль не правильный",
  REG_ERR = "Пользователь с таким email или name уже существует",
  TOKEN_ERR = "Необходимо передать JWT token",
  TOKEN_AUTH = "Невалидный токен",
  USER_NOT_FOUND = "Пользователь не найден",
}
