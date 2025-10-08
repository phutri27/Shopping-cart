import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { CartContext } from "./CartQuantity";
import routes from "./route";


const router = createBrowserRouter(routes);

export default  function App() {
  const [items, setItems] = useState([])

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
  return (
    <CartContext.Provider value={{ items, setItems, layout, setLayout }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
    );
  }
