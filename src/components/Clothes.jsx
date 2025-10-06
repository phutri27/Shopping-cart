import { useParams, useRouteLoaderData } from "react-router";
import { useCart } from "./CartQuantity";
import Header from "./Header";
function Clothes({head}){
    const {id} = useParams();
    const datas = useRouteLoaderData(head);
    let result = datas.find(data => data.id === Number(id))
    const { setItems, items } = useCart();

    function addToCart(){
        const match = items.find(item => item.id === result.id)
        if (!match || match === undefined){
            result.quantity = 1;    
            setItems(it => [...it, result])
        }
        else{
            setItems(item => item.map(it => (
                it.id === result.id ? {...it, quantity: it.quantity + 1} : it
            )))
        }
    }

    return (
        <div>
            <Header />
            <img src={result.imageUrl} alt={result.name} />
            <button onClick={addToCart}>ADD TO CART</button>
        </div>
    )
}

export default Clothes