/// <reference types="@rbxts/testez/globals" />
import store from "../../server/Store/Store"
import {Store, AnyAction} from "@rbxts/rodux";
import { values} from "../../server/Store/Reducers/playerData"
import {playerAction} from "../../server/Store/Actions/playerAction"

const newPlayer = <T>(store:Store<T, AnyAction>) => (plr:Player): void => {
    const action = playerAction(plr)
    store.dispatch(action)
}

export = () => {
    describe("Store Tests", () => {
        it('can load', () => {
            expect(store).to.equal(store)
        })
    })

    describe('playerData', () => {
        const plr = { UserId: 12321331} as Player
       
        it('should be empty', () => {
           const data = store.getState().playerData.get(plr.UserId)
           expect(data).to.equal(undefined)
        })

        it("id should equal UserId", () => {
            newPlayer(store)(plr)
            const data = store.getState().playerData.get(plr.UserId) as values
            expect(data.id).to.equal(plr.UserId) 

        })

        it("lots should be empty", () => {
            const data = store.getState().playerData.get(plr.UserId) as values
        
            expect(data.lots.entries().size()).to.equal(0)
        })

        it("currency should be 0", () => {
            const data = store.getState().playerData.get(plr.UserId) as values
            expect(data.currency).to.equal(0)
        })

        it('inventory should be empty', () => {
            const data = store.getState().playerData.get(plr.UserId) as values
            expect(data.inventory.entries().size()).to.equal(0)
        })



    })
}