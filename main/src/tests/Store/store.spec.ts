/// <reference types="@rbxts/testez/globals" />
import store from "../../server/Store/Store"
import {Store, AnyAction} from "@rbxts/rodux";
import { values} from "../../server/Store/Reducers/playerData"
import {addPlayerAction} from "../../server/Store/Actions/playerAction"
import Object from "@rbxts/object-utils"
import Interceptor, { initInterceptor } from "client/ReplicatedStorage/ClientState/Interceptor";
import { createStore, mockMiddleware, testEnv } from "tests/Mocks/DefaultStore";
import Reducers, { IReducer } from "server/Store/Reducers";
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


    describe("Interceptor",() => {

        const client = createStore(player)
        const middleware = mockMiddleware(client)
        const serverStore =  new Store<IReducer, AnyAction, {}>(Reducers, {}, [middleware])
        const action = setLotAction(player.UserId,"Grid1",true)
        serverStore.dispatch(action)

       it("serverStore has updated",() => {
           expect(serverStore.getState().serverData.available.Business.has("Grid1")).to.equal(false)
       })


    
    });


}