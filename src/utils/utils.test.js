import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import fetchApi from "./utils.js";
import { beforeEach } from "vitest";


describe("api fetching test", () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("returns products when fetch succeed" , async () =>{
        const mockProducts = [{id: 1, name: "shirt"}, {id: 2, name: "pants"}]
        globalThis.fetch = vi.fn(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({products: mockProducts})
            })
        })

        const datas = await fetchApi()
        expect(globalThis.fetch).toHaveBeenCalledOnce()
        expect(datas).toEqual(mockProducts)
    })

    it("throws an error", async () => {
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok:false,
                status: 500
            })
        ) 

        const datas = await fetchApi()
        expect(globalThis.fetch).toHaveBeenCalledOnce()
        expect(datas).toEqual(undefined)
    })

    
})