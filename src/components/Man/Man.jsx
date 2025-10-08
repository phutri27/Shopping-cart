import { useNavigate, useRouteLoaderData } from "react-router";

import Header from "../Header";
import manStyles from './manwoman.module.css'

function Man() {
    const man = useRouteLoaderData("rootman");
    const navigate = useNavigate();

    function navi(idx) {
        navigate(`/man/${idx}`)
    }
    return (
        <>
        <Header />
        <div className={manStyles.clothes}>

            {man.map((men) =>
            <div className={manStyles.imageDiv}>
                <img src={men.imageUrl} alt={men.name} onClick={() => navi(men.id)}/>
                <div className={manStyles.price}>
                    <span onClick={() => navi(men.id)}>{men.name.toUpperCase()}</span> 
                    {men.price.current.text}
                </div>
            </div>
            )}
        </div>
        </>
    )
}

export default Man