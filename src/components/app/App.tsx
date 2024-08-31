import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {ROUTES_OBJECT} from "../../pages";
import {Provider} from "react-redux";
import {store} from "../../store";


const router = createBrowserRouter(ROUTES_OBJECT);
export const App = () => {
    return <Provider store={store}><RouterProvider router={router}/></Provider>
}

