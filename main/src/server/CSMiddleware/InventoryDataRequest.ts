const RS = game.GetService("ReplicatedStorage")
const InventoryData = RS.InventoryData
import { Store } from "@rbxts/rodux"
import { Option } from "@rbxts/rust-option-result"
import { isInInventory } from "server/Build System/ItemRequest"
import { IReducer } from "server/Store/Reducers"
import { ItemProperties } from "server/Store/Reducers/itemData"
import { values } from "server/Store/Reducers/playerData"
import store from "server/Store/Store"

export const getItemData = (store:Store<IReducer>) => (itemID:string) => {
    const result = Option.some(store.getState().itemData.get(itemID) as ItemProperties)
    return result.isSome() ? result.unwrap() : false
}

export const getInventoryDataWrapper = (plr:Player) => {
    const data = getInventoryData(store)(plr)
    sendData(plr)(data)
}

export const sendData = (plr:Player) => (data:(false|ItemProperties)[]) => {
    InventoryData.FireClient(plr,data)
}

export const getInventoryData = (store:Store<IReducer>) => (plr:Player) => {
    const result = Option.some(store.getState().playerData.get(plr.UserId) as values)
        .filter(data => data !== undefined)
        .map(data => data.inventory.entries().map(entry => {
            return entry[1] ? getItemData(store)(entry[0])  : false
        }))
        .map(data => data.filter( x => x !== false ))
    
    return result.isSome() ? result.unwrap() : []
 
}

