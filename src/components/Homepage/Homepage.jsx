import Header from "../Header"
import { Outlet, useLoaderData } from "react-router"
import { useCart } from "../CartQuantity"
function Homepage() {
    const { layout } = useCart()
    const datas = useLoaderData()

    return(
        <>
            <Header />
            {layout.map(lays => (
                lays.display 
                ? (lays.id === 1 ? <LayoutMan datas={datas}/> : <LayoutWoman datas={datas}/>) 
                : null
            ))}
            <div>
                Shopping
            </div>
        </>
    )
}

function LayoutMan({datas}){
    const { setLayout } = useCart()

    function setClothes(id){
        setLayout(layout => layout.map(lays => (
            lays.id === id ? {...lays, display: !lays.display} : lays
        )))
    }

    return(
        <div onMouseLeave={() => setClothes(1)}>
            {datas.map(data =>
                <img src={data.imageUrl} alt={data.name} />
            )}
        </div>
    )
}

function LayoutWoman({datas}){
    return (
        <div>
            {datas.map(data =>
                <img src={data.imageUrl} alt={data.name} />
            )}
        </div>
    )
}
export default Homepage