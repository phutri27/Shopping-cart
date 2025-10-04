import { useParams, useRouteLoaderData } from "react-router";
import { useCart } from "./Cart";
import Header from "./Header";
function Clothes(){
    const {id} = useParams();
    const datas = useRouteLoaderData("rootman");
    const result = datas.find(data => data.id === Number(id))
    const { setQuantity } = useCart();

    function addToCart(){
        setQuantity(q => q + 1)
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