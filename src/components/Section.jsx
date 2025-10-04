import { Link, useNavigate, useParams, useRouteLoaderData } from "react-router";
import './styles.css'

 function Header(){
    return (
        <header>
            <Link to="/man">Man</Link>
            <Link to="/woman">Woman</Link>
        </header>
    )
}
function Homepage() {
    return(
        <>
            <Header />
            <div>
                Shopping
            </div>
        </>
    )
}


function Woman(){
    return (
        <>
            <Header />
            <div>
                Woman
            </div>
        </>
    )
}

function Man() {
    const man = useRouteLoaderData("rootman")
    const navigate = useNavigate();

    function navi(idx) {
        navigate(`/man/${idx}`)
    }
    return (
        <>
        <div className="men-clothes">
            <Header />
            {man.map((men) =>
            <div>
                <img src={men.imageUrl} alt={men.name} onClick={() => navi(men.id)}/>
                <p>{men.name} <span>{men.price.current.text}</span></p>
                <button>ADD TO CART</button>
            </div>
            )}
        </div>
        </>
    )
}

function Clothes(){
    const {id} = useParams();
    const datas = useRouteLoaderData("rootman");
    const result = datas.find(data => data.id === Number(id))
    return (
        <img src={result.imageUrl} alt="" />
    )
}

export {Homepage, Woman, Man, Clothes}
