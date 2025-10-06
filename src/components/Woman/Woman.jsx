import { useNavigate, useRouteLoaderData } from "react-router";
import Header from "../Header";

function Woman(){
    const woman = useRouteLoaderData("rootwoman");
    const navigate = useNavigate();
    function navi(idx) {
        navigate(`/woman/${idx}`)
    }
    return (
        <>
            <Header />
            {woman.map((women) =>
            <div>
                <img src={women.imageUrl} alt={women.name} onClick={() => navi(women.id)}/>
                <p>{women.name} <span>{women.price.current.text}</span></p>
            </div>
            )}
        </>
    )
}

export default Woman