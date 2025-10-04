import fetchApi from "../utils/utils";
import { Outlet } from "react-router";
import Homepage from "./Homepage/Homepage";
import Woman from "./Woman/Woman";
import Man from "./Man/Man";
import Clothes from "./Clothes";

const routes = [
    {
        path: "/",
        element: <Homepage />,
    },
    {
        id: "rootman",
        path: "/man",
        element: <Outlet />,
        loader: async () => {
            const products = await fetchApi();
            return products.map(product => ({
                ...product,
                imageUrl: product.imageUrl?.startsWith("http") ? product.imageUrl : `https://${product.imageUrl}`
            }))
        },
        children: [
            {index: true, element: <Man />},
            {path: ":id", element: <Clothes />}
        ]
    },

    {
        path: "/woman",
        element: <Woman />
    }
    
]

export default routes;