/// <reference types="@rbxts/testez/globals" />

import store from "../../server/Store/Store"
import {Store, AnyAction} from "@rbxts/rodux";
import { values} from "../../server/Store/Reducers/playerData"
import {addPlayerAction} from "../../server/Store/Actions/playerAction"
import Object from "@rbxts/object-utils"
import Interceptor, { initInterceptor } from "client/ReplicatedStorage/ClientState/Interceptor";
import { createClientStore, createServerStore, mockMiddleware, testEnv } from "tests/Mocks/DefaultStore";
import Reducers, { IServerReducer } from "server/Store/Reducers";
import clientMiddleware from "server/Store/ClientMiddleware";
import { setLotAction } from "client/ReplicatedStorage/ClientState/Actions/serverAction"

const newPlayer = <T>(store:Store<T, AnyAction>) => (plr:Player): void => {
    const action = addPlayerAction(plr)
    store.dispatch(action)
}

const {player} = testEnv()

export = () => {

    describe("Store Tests", () => {
        it('can load', () => {
            expect(store).to.equal(store)
        })
    })

    describe("Interceptor", () => {

        const client = createClientStore()
        const middleware = mockMiddleware(client)
        const serverStore =  new Store<IServerReducer, AnyAction, {}>(Reducers, {}, [middleware])
        const action = setLotAction(player.UserId,"Grid1",true)
        const action1 = addPlayerAction(player)
        serverStore.dispatch(action1)
        serverStore.dispatch(action)

        
       it("has the player",()=> {
            expect(serverStore.getState().serverData.players.get(player.UserId)?.lots.Business.active).to.equal("Grid1")
        })

       it("serverStore has updated",() => {
           expect(serverStore.getState().serverData.available.Business.has("Grid1")).to.equal(false)
       })

       it("should show proper available lots on client", () => {
           const result = client.getState().serverData.available.Business.has("Grid1")
           expect(result).to.equal(false)
       })

       it("should show proper player active lot data",() => {
        const result = client.getState().serverData.players.get(player.UserId)?.lots.Business.active
        expect(result).to.equal("Grid1")
       })

       it("Should should show proper lot assignment",() => {
           const result = client.getState().serverData.lots.get("Grid1")
           expect(result).to.equal(player.UserId)
       })




      
    
    });
}