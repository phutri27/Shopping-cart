import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate, useRouteLoaderData } from "react-router";
import Man from "./Man"
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useRouteLoaderData: vi.fn(),
  useNavigate: () => mockNavigate
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

describe("Man section component" , () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Test man section render " ,() => {
        useRouteLoaderData.mockReturnValue(sampleData);

        render(<Man />)
        expect(screen.getByAltText("Blue Shirt")).toBeInTheDocument()
        expect(screen.getByAltText("Red Dress")).toBeInTheDocument()
        expect(screen.getByText("$40.00")).toBeInTheDocument()
    })

    it ('test navigate function', async () => {
        const user = userEvent.setup()
        render(<Man />)
        const img = screen.getByAltText("Blue Shirt")
        await user.click(img)

        expect(mockNavigate).toHaveBeenCalledWith("/man/1")
    })
})