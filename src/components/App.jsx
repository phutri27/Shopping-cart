import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { CartContext } from "./CartQuantity";
import routes from "./route";


const router = createBrowserRouter(routes);

export default  function App() {
  const datas = JSON.parse(localStorage.getItem('items')) || []
  const [items, setItems] = useState(datas)

  const [layout, setLayout] = useState([
    {
      id : 1,
      display: false,
    },
    {
      id : 2,
      display: false,
    }
  ])
  localStorage.setItem("items", JSON.stringify(items))
  return (
    <CartContext.Provider value={{ items, setItems, layout, setLayout }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
    );
  }
