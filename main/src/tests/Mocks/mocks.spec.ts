/// <reference types="@rbxts/testez/globals" />

import { createStore, ItemEnv } from "./DefaultStore"



export = () => {


    describe("ItemEnv" ,() => {
        const {store,RS,player, model, prop}  = ItemEnv()
  
        it("should fetch player", () => {
            expect(store.getState().playerData.get(player.UserId)!.id).to.equal(player.UserId)        
        })


        it("should return the item data", () => {
            const result = store.getState().itemData.get(prop.id)
            expect(result).to.never.equal(undefined)
        })


        it("should have valid playerData", () => {
            const result = store.getState().playerData.get(player.UserId)
            expect(result).to.never.equal(undefined)
        })

        
        it("item should exist in inventory", () => {
            const result = store.getState().playerData.get(player.UserId)
            expect(result!.inventory.get(prop.id)).to.never.equal(undefined)
        })


        
    })


}