 import { useCart } from "./Cart";
 import { Link } from "react-router";
 
 function Header(){
    const { quantity } = useCart();
    return (
        <header>
            <Link to="/man" >Man</Link>
            <Link to="/woman">Woman</Link>
            <p>Cart: {quantity}</p>
        </header>
    )
}

export default Header