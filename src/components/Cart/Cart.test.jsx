import {createContext, useContext, useState} from "react"
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import UserEvent from "@testing-library/user-event";
import Cart from "./Cart";

const testCart = createContext(null)

function TestUseCart(){
    return useContext(testCart)
}

vi.mock("../CartQuantity", () => ({
    useCart: TestUseCart
}))

vi.mock("../Header", () => ({
    default: () => <div data-test-id="header">Header</div>
}))

function renderWithCart(initialItems) {
  function Wrapper() {
    const [items, setItems] = useState(initialItems);
    return (
      <testCart.Provider value={{ items, setItems }}>
        <Cart />
      </testCart.Provider>
    );
  } 
  return render(<Wrapper />);
}

describe("test cart componet",() =>{
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    const sampleItems = [
        {
            id: 1,
            name: "Shirt",
            imageUrl: "https://example.com/shirt.jpg",
            quantity: 2,
            price: { current: { value: 10, text: "$10.00" } },
        },
        {
            id: 2,
            name: "Pants",
            imageUrl: "https://example.com/pants.jpg",
            quantity: 1,
            price: { current: { value: 5, text: "$5.00" } },
        },
    ];

    it("test increment button", async () => {
        const user = UserEvent.setup()
        renderWithCart(sampleItems)
        const increaseButtons = screen.getAllByRole("button", {
            name: /increase quantity/i,
        });

        await user.click(increaseButtons[1])
        await user.click(increaseButtons[0])
        await user.click(increaseButtons[0])

        expect(await screen.findByText(/\$40\.00/)).toBeInTheDocument();
        const grandTotal = await screen.findByLabelText(/grand total/i);
        expect(grandTotal).toHaveTextContent(/\$50\.00/);
    })

    it("test decrement button when hit 0", async () => {
        const user = UserEvent.setup()
        renderWithCart(sampleItems);

        const buttonDown = screen.getAllByRole("button", {name: /decrease quantity/i})
        await user.click(buttonDown[1])

        expect(screen.queryByAltText("Pants")).not.toBeInTheDocument()
    })

    it("test remove button", async () => {
        const user =UserEvent.setup();
        renderWithCart(sampleItems)

        const removeBtn = screen.getAllByRole("button", {name: /remove from cart/i})
        await user.click(removeBtn[0])

        expect(screen.queryByAltText("Shirt")).not.toBeInTheDocument()
    })
})