 import { useCart } from "./CartQuantity";
 import { Link } from "react-router";
 
 function Header(){
    const { items, setLayout } = useCart();
    const totalItems = items.reduce((sum, currentVal) => sum + currentVal.quantity, 0)

    function setClothes(id){
        setLayout(layout => layout.map(lays => (
            lays.id === id ? {...lays, display: !lays.display} : lays
        )))
    }

    return (
        <header>
            <Link onMouseOver={() => setClothes(1)}  to="/man" >Man</Link>
            <Link onMouseOver={() => setClothes(2)} to="/woman">Woman</Link>
            <Link to="/cart">Cart: {totalItems}</Link>
        </header>
    )
}

export default Header