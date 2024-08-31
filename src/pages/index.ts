import {RouteObject} from "react-router-dom";
import {ROUTES} from "../routes";
import HomePage from "./home";
import ErrorPage from "./error";
import CryptoPage from "./crypto";


export const ROUTES_OBJECT: RouteObject[] = [
    {
        index: true,
        path: ROUTES.home,
        Component: HomePage,
    },
    {
        path: `${ROUTES.coin}/:name`,
        Component: CryptoPage
    },
    {
        Component: ErrorPage,
        path: ROUTES.notFount,
    },
];