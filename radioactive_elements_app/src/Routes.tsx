export const ROUTES = {
    MAIN: "/",
    ELEMENTS: "/elements",
  };
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  MAIN: "Главная",
  ELEMENTS: "Элементы",
 };