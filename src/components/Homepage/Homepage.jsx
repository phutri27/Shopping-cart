import Header from "../Header"
import { useCart } from "../CartQuantity"
import fetchApi from "../../utils/utils"
import { useEffect, useState } from "react"
import styles from './homepage.module.css'

function Homepage() {
  const { layout, setLayout } = useCart();
  const [man, setMan] = useState(null);
  const [woman, setWoman] = useState(null);
  const [show, setShow] = useState(true)

  function setClothes(){
    setLayout(layout => layout.map(lays => (
        {...lays, display: false} 
    )))
  }

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {

        const [dataMan, dataWoman] = await Promise.all([
          fetchApi(
            "https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4208&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=6&lang=en-US",
            { signal: ctrl.signal }
          ),
          fetchApi(
            "https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&country=US&sort=freshness&q=bra&currency=USD&sizeSchema=US&limit=6&lang=en-US",
            { signal: ctrl.signal }
          ),
        ]);

        if (!ctrl.signal.aborted) {
          setMan(dataMan);
          setWoman(dataWoman);
        }
      } catch (e) {
        if (!ctrl.signal.aborted) console.log(e)
      } 
    })();
    return () => ctrl.abort();
  }, []);
  
  return (
    <>
      <Header />
      <div className={styles.layout}>
        {layout.map((lays) =>
          lays.display ? (
            <div key={lays.id}>
              {lays.id === 1 ? (
                man ? (
                  <Layout datas={man} show={show} setShow={setShow} setClothes={setClothes}/>
                ) : null
              ) : woman ? (
                <Layout datas={woman} show={show} setShow={setShow} setClothes={setClothes}/>
              ) : null}
            </div>
          ) : null
        )}
        <div className={styles.shopping}>
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWZ4bXdvamMwd2lxbTN6NXRrbXMzNGpqa2ZhOHhvM2Nzbjlxems2NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2TnVVugwBiSTm/giphy.gif" alt="" />
        </div>
      </div>
    </>
  );
}

function Layout({datas, show, setShow, setClothes}){
    function setAni(){
      if (!show){
        setClothes()
      }
      setShow(true)
    }

    return(
        <div>
            <div className={show ? styles.sidebar : styles.sidebarReturn} onMouseLeave={() => setShow(false)} onAnimationEnd={() => setAni()}>
              {datas.map(data =>
                  <img key={data.id} src={data.imageUrl?.startsWith("http") ? data.imageUrl : `https://${data.imageUrl}`} alt={data.name} />
              )}
            </div>
        </div>
    )
}

export default Homepage