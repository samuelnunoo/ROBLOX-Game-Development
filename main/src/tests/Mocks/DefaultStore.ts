import {Store, AnyAction} from "@rbxts/rodux"
import {playerAction, inventoryAction} from "server/Store/Actions/playerAction"
import { IReducer } from "server/Store/Reducers"
import Reducer from "server/Store/Reducers/index"
import store from "server/Store/Store"
import ClientMiddleware from "server/Store/ClientMiddleware"


interface IInventory {
    itemId: string;
    add: boolean;
}

// -- This creates a default store with a player with instantiated values as defined 
export const createStore = (player:Player) => {
 const store = new Store<IReducer, AnyAction, {}>(Reducer, {}, [ClientMiddleware])
 store.dispatch(playerAction(player))

 return store 
}

export const setInventory = (store:Store<IReducer>) => (player:Player)  => ( items:IInventory[]) => {
    items.forEach( item => {
        store.dispatch(inventoryAction(player, item.itemId,item.add))
    })

    return store 
}

export const mockInventory = (player:Player) => (items: IInventory[]) => {
    const store = createStore(player)
    return setInventory(store)(player)(items)
}