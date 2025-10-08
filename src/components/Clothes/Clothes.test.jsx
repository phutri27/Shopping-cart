import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useRouteLoaderData } from "react-router";
import { useCart } from "../CartQuantity";
import Clothes from "./Clothes";

vi.mock("react-router", () => ({
  useParams: vi.fn(),
  useRouteLoaderData: vi.fn(),
}));

vi.mock("../Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("../CartQuantity", () => ({
  useCart: vi.fn(),
}));

const sampleData = [
  {
    id: 1,
    name: "Blue Shirt",
    imageUrl: "https://example.com/shirt.jpg",
    price: { current: { text: "$20.00", value: 20 } },
    colour: "Blue",
  },
  {
    id: 2,
    name: "Red Dress",
    imageUrl: "https://example.com/dress.jpg",
    price: { current: { text: "$40.00", value: 40 } },
    colour: "Red",
  },
];

describe("Clothes component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correct product data from route", () => {
    // arrange
    useParams.mockReturnValue({ id: "1" });
    useRouteLoaderData.mockReturnValue(sampleData);
    useCart.mockReturnValue({ items: [], setItems: vi.fn() });


    // assert
    expect(render(<Clothes head="man" />)).toMatchSnapshot();
  });

    it("adds a new item to the cart if not present", async () => {
    const user = userEvent.setup();
    const mockSetItems = vi.fn();

    useParams.mockReturnValue({ id: "1" });
    useRouteLoaderData.mockReturnValue(sampleData);
    useCart.mockReturnValue({ items: [], setItems: mockSetItems });

    render(<Clothes head="man" />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);

    // should call setItems with an array containing the product
    expect(mockSetItems).toHaveBeenCalledTimes(1);
    const callArg = mockSetItems.mock.calls[0][0];
    expect(typeof callArg).toBe("function"); // because setItems is called with updater fn
  });
})
