import { useCart } from "../CartQuantity"
import Header from "../Header"
import styles from './styles/cart.module.css'
import { Plus, Minus, Trash2 } from 'lucide-react'

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
            <div className={styles.layout}>
                <div className={styles.title}>
                    <h1>CART</h1>
                </div>
                {items.length === 0 ? (<h1>THERE'S NOTHING IN THE CART</h1>) : 
                (<div className={styles.layoutInner}>
                    <div>
                        {items.map(item =>
                            <div key={item.id} className={styles.item}>
                                <img src={item.imageUrl} alt={item.name} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.price}>
                                        <p >{item.name.toUpperCase()}</p>
                                        <p>{item.price.current.text}</p>
                                    </div>
                                    <div className={styles.info}>
                                        <div>
                                            <p>Product's ID</p>
                                            <p>Color</p>
                                            <p>Quantity</p>
                                            <p>Total</p>
                                        </div>
                                        <div>
                                            <p>{item.id}</p>
                                            <p>{item.colour}</p>
                                            <p>{item.quantity}</p>
                                            <p className={styles.total}>${(item.quantity * item.price.current.value).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className={styles.btnDiv}>
                                        <div className={styles.btnDivInner}>
                                            <Down down={downItem} id={item.id}/>
                                            <p>{item.quantity}</p>
                                            <Up up={upItem} id={item.id}/>
                                        </div>
                                        <button onClick={() => deleteItem(item.id)}><Trash /></button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.checkout}>
                        <div className={styles.checkoutInner}>
                            <div>
                                <p>Items total</p>
                                <p>Shipping fees</p>
                                <p className={styles.totalText}>TOTAL</p>
                            </div>
                            <div>
                                <p>${sumTotal.toFixed(2)}</p>
                                <p>Free</p>
                                <p aria-label="grand total" className={styles.totalCheckout}>${sumTotal.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className={styles.buttonCheckout}>
                            <button>PROCEED TO CHECKOUT</button>
                        </div>
                        <div className={styles.checkoutInfo}>
                            <div className={styles.checkoutMethod}>
                                <img src="src/assets/visa.png" alt="visa" />
                                <img src="src/assets/mastercard.png" alt="mastercard" />
                            </div>
                            <div className={styles.checkoutDescription}>
                                <p>This price and shipping cost is not final until you reach the checkout.</p>
                                <p>Free returns within 30 days. <span>returns and refunds.</span></p>
                                <p>Need help? Please contact <span>Customer Support.</span></p>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

function Up({id, up}){
    return <Plus aria-label="Increase quantity" role="button" className={styles.lucide} onClick={() => up(id)} size={30} strokeWidth={1.5}/>
}

function Down({id, down}){
    return <Minus aria-label="Decrease quantity" role="button" className={styles.lucide} onClick={() => down(id)} size={30} strokeWidth={1.5}/>
}

function Trash() {
    return <Trash2 aria-label="Remove from cart" role="button" className={styles.lucide} size={30} strokeWidth={1.5}/>
}
export default Cart