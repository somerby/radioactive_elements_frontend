export const ROUTES = {
  MAIN: "/",
  ELEMENTS: "/elements",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  ACCOUNT: "/account",
  DECAYS: "/decays"
  };
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  MAIN: "Главная",
  ELEMENTS: "Элементы",
  LOGIN: "Вход",
  REGISTRATION: "Регистрация",
  ACCOUNT: "Личный кабинет",
  DECAYS: "Распады"
 };