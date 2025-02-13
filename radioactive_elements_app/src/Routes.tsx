export const ROUTES = {
  MAIN: "/",
  ELEMENTS: "/elements",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  ACCOUNT: "/account",
  DECAYS: "/decays",
  ELEMENTS_TABLE: "/elements_table",
  ADDEDITELEMENT: '/elements_table/add_edit_element',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404'
  };
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  MAIN: "Главная",
  ELEMENTS: "Элементы",
  LOGIN: "Вход",
  REGISTRATION: "Регистрация",
  ACCOUNT: "Личный кабинет",
  DECAYS: "Распады",
  ELEMENTS_TABLE: "Таблица элементов",
  ADDEDITELEMENT: "",
  FORBIDDEN: "Нет доступа",
  NOT_FOUND: "Не найдено"
 };