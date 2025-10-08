import { useParams, useRouteLoaderData } from "react-router";
import { useCart } from "../CartQuantity";
import Header from "../Header";
import styles from "./clothes.module.css"

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
            <div className={styles.layout}>
                <img src={result.imageUrl} alt={result.name} />
                <div className={styles.inner}>
                    <div className={styles.title}>
                        <p className={styles.name}>{result.name.toUpperCase()}</p>
                        <p className={styles.text}>{result.price.current.text}</p>
                    </div>
                    <div className={styles.price}>
                        <p>COLOR: {result.colour}</p>
                        <img src={result.imageUrl} alt={result.name} />
                    </div>
                    <div className={styles.buttonDiv}>
                        <button onClick={addToCart}>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clothes  