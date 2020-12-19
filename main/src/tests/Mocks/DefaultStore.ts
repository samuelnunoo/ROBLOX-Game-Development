import {Store, AnyAction} from "@rbxts/rodux"
import { inventoryAction, setActiveItem, lotAction, setActiveLot, addPlayerAction} from "server/Store/Actions/playerAction"
import {itemPayload} from "server/Store/Actions/itemAction"
import { IReducer } from "server/Store/Reducers"
import Reducer from "server/Store/Reducers/index"
import store from "server/Store/Store"
import ClientMiddleware from "server/Store/ClientMiddleware"
import { ItemProperties } from "server/Store/Reducers/itemData"
import { updateAction } from "server/Store/Actions/itemAction"

interface IInventory {
    itemId: string;
    add: boolean;
}

// -- This creates a default store with a player with instantiated values as defined 
export const createStore = (player:Player) => {
 const store = new Store<IReducer, AnyAction, {}>(Reducer, {}, [ClientMiddleware])
 store.dispatch(addPlayerAction(player)) 

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

export const mockActiveItem = (player:Player) => (active:IInventory) => {
     const store = mockInventory(player)([active])
     store.dispatch(setActiveItem(player,active.itemId))

     return store 
}

export const getItemProp = (itemID:string) => (owner:string) => (rarity:"High" | "Low"| "Medium") => (model:Model) => ({
    id:itemID,
    model,
    style: new Map(),
    rarity,
    owner,
    lotSave:undefined,
    orientation:undefined,
    offset:undefined
} as itemPayload)
 

export const setLot = (store:Store<IReducer>) => (player:Player) => (LotId:string) => {
    const action = setActiveLot(player, new Instance("Part"),LotId)
    store.dispatch(action)
    
    return store
} 

export const ItemEnv = ()  => {

    const {RS, player} = testEnv()
    const store = createStore(player)
    const _rarity = ["High","Low","Medium"]
    const rarity = _rarity[math.random(2)] as "High" | "Low" | "Medium"
 
    const model = new Instance("Model")
    model.Name = "Test"
    model.Parent = RS.Models 
    const itemID = tostring(math.random(1235304))
    const owner = tostring(player.UserId)

    

    const prop = getItemProp(itemID)(owner)(rarity)(model)
    const newStore = setInventory(setItemProp(store)(prop))(player)([{itemId:itemID, add:true}])
    const lotID = '12345'
    const newnewStore = setLot(newStore)(player)(lotID)

    return {
        store:newnewStore, RS, player, model, prop, lotID
    }

}

export const setItemProp = (store:Store<IReducer>) => (itemProps:itemPayload) => {
    store.dispatch(updateAction(itemProps))
    return store 
}

export const mockModels = (RS:ReplicatedStorage) => (models: Model[]) => {
    models.forEach( model => model.Parent = RS.Models)
    return RS
}

export const createModel = (name:string) => {
    const item = new Instance("Model")
    item.Name = name 

    return item 
}

export const testEnv = () => {
   const UserId =  math.random()
   const RS = game.GetService("ReplicatedStorage")

   const player = { UserId } as Player

   return  { player, RS }
}