import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { CartContext } from "./Cart";
import routes from "./route";

const router = createBrowserRouter(routes);

export default function App() {
  const [quantity, setQuantity] = useState(0);
  return (
    <CartContext.Provider value={{ quantity, setQuantity }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  );
}
