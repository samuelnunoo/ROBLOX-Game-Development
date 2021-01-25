import { createServerStore, testEnv } from '../Mocks/DefaultStore';
import { updateAction, removeAction } from '../../server/Store/Actions/itemAction';
import { HttpService } from '@rbxts/services';
import { Items } from 'server/Items/Enums';
import { ItemProperties } from '../../server/Store/Reducers/itemData';
import { update } from '@rbxts/roact';
/// <reference types="@rbxts/testez/globals" />


export = () => {
    describe("updateAction", () => {
        const {player} = testEnv()
        const store = createServerStore(player)
        const data = { id: "123", owner:player.UserId, template: Items.chair, location: "Inventory" } as ItemProperties
        const action = updateAction(data)
        const init = store.getState().itemData

        it("id 123 should not exist before dispatch", () => {
            expect(init.get("123")).to.equal(undefined)
        })
        
        store.dispatch(action)
        const result =  store.getState().itemData

        it("id 123 should exist", () => {
            expect(result.get("123")).to.equal(data)
        })

        it("id 123 should container updated result", () => {
            const data2 = { id: "123", owner:player.UserId, template: Items.chair, location: "Lot" } as ItemProperties
            const action2 = updateAction(data2)
            store.dispatch(action2)
            const result2 = store.getState().itemData
            expect(result2.get("123")?.location).to.equal("Lot")
            
        })


    })

    describe("removeAction",() => {
        const {player} = testEnv()
        const store = createServerStore(player)
        const data = { id: "123", owner:player.UserId, template: Items.chair, location: "Inventory" } as ItemProperties
        const action = updateAction(data)
        store.dispatch(action)
        const init = store.getState().itemData


        it("should contain data at first",() => {
            expect(init.get("123")).to.equal(data)
        })

        it("should no longer contain id 123", () =>{
            const action = removeAction("123")
            store.dispatch(action)
            const result = store.getState().itemData
            expect(result.get("123")).to.equal(undefined)
        })
    })
}
