 import { useCart } from "./CartQuantity";
 import { Link } from "react-router";
 import styles from "./styles/header.module.css"
 import { Handbag, Search } from "lucide-react";

 function Header(){
    const { items, setLayout } = useCart();
    const totalItems = items.reduce((sum, currentVal) => sum + currentVal.quantity, 0)

    function setClothes(id, value){
        setLayout(layout => layout.map(lays => (
            lays.id === id ? {...lays, display: value} : {...lays, display: !value}
        )))
    }

    return (
        <header className={`${styles.header} headers`}>
            <div>
                <Link to="/" className={styles.icon}>
                    <img src="src/assets/h&m.png" alt="" />
                </Link>
                <div className={styles.category}>
                    <Link className={styles.link} onMouseEnter={() => setClothes(1, true)}  to="/man" >MAN</Link>
                    <Link className={styles.link} onMouseEnter={() => setClothes(2, true)}  to="/woman">WOMAN</Link>
                </div>
                <div className={styles.gay}>
                
                </div>
            </div>
            <Link className={styles.cartIcon} to="/cart">
                <div></div>
                <div className={styles.bagDiv}>
                    <Glass />
                    <div>
                        <Bag />
                        <div>{totalItems}</div>
                    </div> 
                </div>
            </Link>
        </header>
    )
}

function Bag(){
    return <Handbag  color="black" size={20} strokeWidth={1.7}  />
}

function Glass(){
    return <Search color="black" size={20} strokeWidth={1.7}/>
}

export default Header