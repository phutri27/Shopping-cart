import { Homepage, Woman, Man, Clothes } from "./Section";
import fetchApi from "../utils/utils";


const routes =[
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/man",
        element: <Man />,
        loader: async () => {
            const products = await fetchApi();
            return products.map(product => ({
                ...product,
                imageUrl: product.imageUrl?.startsWith("http") ? product.imageUrl : `https://${product.imageUrl}`
            }))
        }
    },
    {
        path: "/man/:id",
        element: <Clothes />,
    },
    {
        path: "/woman",
        element: <Woman />
    }
    
]

export default routes;