import { useNavigate, useRouteLoaderData } from "react-router";
import Header from "../Header";
import styles from "../Man/manwoman.module.css"

function Woman(){
    const woman = useRouteLoaderData("rootwoman");
    const navigate = useNavigate();
    function navi(idx) {
        navigate(`/woman/${idx}`)
    }
    return (
        <>
            <Header />
            <div className={styles.clothes}>
                {woman.map((women) =>
                <div className={styles.imageDiv}>
                    <img src={women.imageUrl} alt={women.name} onClick={() => navi(women.id)}/>
                    <div className={styles.price}>
                        <span onClick={() => navi(women.id)}>{women.name.toUpperCase()}</span> 
                        {women.price.current.text}
                    </div>
                </div>
                )}
            </div>
        </>
    )
}

export default Woman