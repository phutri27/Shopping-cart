import fetchApi from "../utils/utils";
import { Outlet } from "react-router";
import Homepage from "./Homepage/Homepage";
import Woman from "./Woman/Woman";
import Man from "./Man/Man";
import Clothes from "./Clothes/Clothes";
import Cart from "./Cart/Cart";

async function fetching(URL){
    const url = URL
    const products = await fetchApi(url);
    return products.map(product => ({
        ...product,
        imageUrl: product.imageUrl?.startsWith("http") ? product.imageUrl : `https://${product.imageUrl}`
    }))
}

const routes = [
    {
        path: "/",
        element: <Homepage />,
    },
    {
        id: "rootman",
        path: "/man",
        element: <Outlet />,
        loader: () => {
            const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4208&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=15&lang=en-US';
            return fetching(url)
        },
        children: [
            {index: true, element: <Man />},
            {path: ":id", element: <Clothes head="rootman"/>}
        ]
    },

    {
        id: "rootwoman",
        path: "/woman",
        element: <Outlet />,
        loader:() => {
            const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&country=US&sort=freshness&q=bra&currency=USD&sizeSchema=US&limit=15&lang=en-US';
            return fetching(url)
        },
        children: [
            {index: true, element: <Woman />},
            {path: ":id", element: <Clothes head="rootwoman"/>}
        ]
    },
    {
        path: "/cart",
        element: <Cart />
    }
    
]

export default routes;