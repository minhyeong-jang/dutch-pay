import { RouteProps } from "react-router-dom";
import { DutchPage } from "../dutch/pages";

const prefix = "/";

export const routes: RouteProps[] = [
  {
    component: DutchPage,
    path: prefix,
  },
];
