import { useCart } from "../CartQuantity"
import Header from "../Header"
function Cart(){
    const { items, setItems } = useCart();
    const sumTotal = items.reduce((sum, currentVal) => sum + (currentVal.price.current.value * currentVal.quantity), 0)
  
    function deleteItem(id){
        setItems(item => item.filter(it => it.id !== id))
    }

    function upItem(id){
        setItems(item => item.map(it => (
            it.id === id ? {...it, quantity: it.quantity + 1} : it
        )))
    }

    function downItem(id){
        setItems(item => item.map(it => (
            it.id === id ? {...it, quantity: it.quantity - 1} : it
        )).filter(it => it.quantity > 0))
    }

    return(
        <div>
            <Header />
            {items.map(item =>
                <div key={item.id}>
                    <img src={item.imageUrl} alt={item.name} />
                    <p>{item.quantity}</p>
                    <p>{item.price.current.text}</p>
                    <p>Total: ${(item.quantity * item.price.current.value).toFixed(2)}</p>
                    <button onClick={() => upItem(item.id)}>Up</button>
                    <button onClick={() => downItem(item.id)}>Down</button>
                    <button onClick={() => deleteItem(item.id)}>Remove from cart</button>
                </div>
            )}
            <p>Items total: ${sumTotal.toFixed(2)}</p>
        </div>
    )
}

export default Cart