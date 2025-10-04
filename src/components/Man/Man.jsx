import { useNavigate, useRouteLoaderData } from "react-router";
import Header from "../Header";
import manStyles from './man.module.css'

function Man() {
    const man = useRouteLoaderData("rootman");
    const navigate = useNavigate();

    function navi(idx) {
        navigate(`/man/${idx}`)
    }
    return (
        <>
        <div className={manStyles.menClothes}>
            <Header />
            {man.map((men) =>
            <div>
                <img src={men.imageUrl} alt={men.name} onClick={() => navi(men.id)}/>
                <p>{men.name} <span>{men.price.current.text}</span></p>
            </div>
            )}
        </div>
        </>
    )
}

export default Man