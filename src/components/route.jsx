import { Homepage, Woman, Man ,Clothes } from "./Section";
import fetchApi from "../utils/utils";
import { Outlet } from "react-router";


const routes =[
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