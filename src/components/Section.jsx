import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import fetchApi from "../utils/utils";
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
    // const [man, setMan] = useState(null);
    // const [woman, setWoman] = useState(null);
    // useEffect(() =>{
    //     async function test(){
    //         const arr = await fetchApi()
    //         const man = [];
    //         const woman = [];
    //         for (let i = 0; i < 20; i++){
    //             man.push(arr[i]);
    //         }
    //         for (let i = 20; i < 40; i++){
    //             woman.push(arr[i]);
    //         }
    //         setMan(man);
    //         setWoman(woman);
    //     }
    //     test()
    //     return
    // }, [])
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
    const man = useLoaderData()
    const navigate = useNavigate();
    function navi(idx) {
        navigate(`/man/${idx}`)
    }
    return (
        <div className="men-clothes">
            <Header />
            {man.map((men, index) =>
            <div onClick={() => navi(index)}>
                <img src={men.imageUrl} alt={men.name} />
                <p>{men.name} <span>{men.price.current.text}</span></p>
            </div>
            )}
        </div>
    )
}

function Clothes(){
    return <h1>test</h1>
}

export {Homepage, Woman, Man, Clothes}
