const RS = game.GetService("ReplicatedStorage")
const serverRemote = RS.serverRemote
import { Store } from "@rbxts/rodux"
import { Option } from "@rbxts/rust-option-result"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import { isInInventory } from "server/Build System/ItemRequest"
import { IServerReducer } from "server/Store/Reducers"
import { ItemProperties } from "server/Store/Reducers/itemData"
import { values } from "server/Store/Reducers/playerData"
import store from "server/Store/Store"
import Object from "@rbxts/object-utils"

export interface InventoryStuff {
    id: String;
    model:Model;
    rarity: "High"|"Medium"|"Low"
}

export const getItemData = (store:Store<IServerReducer>) => (itemID:string) => {
    const result = Option.some(store.getState().itemData.get(itemID) as ItemProperties)
    return result.isSome() ? result.unwrap() : false
}

export const getInventoryDataWrapper = (plr:Player) => {
    const data = getInventoryData(store)(plr)
    sendData(plr)(data)
}

export const sendData = (plr:Player) => (data:InventoryStuff[]) => {
    serverRemote.FireClient(plr,Request_ID.Update_Store,data)
}

export const getInventoryData = (store:Store<IServerReducer>) => (plr:Player) => {
    const result = Option.some(store.getState().playerData.get(plr.UserId) as values)
        .filter(data => data !== undefined)
        .map(data => Object.entries(data.inventory).map( entry => {
            return entry[1] ? getItemData(store)(entry[0])  : false
        }))
        .map(data => data.filter( x => x !== false ) as ItemProperties[])
        .map(data => data.map(x => ({
            "id":x.id,
            "model":x.model,
            "rarity":x.rarity
        } as InventoryStuff)))
        
    return result.isSome() ? result.unwrap() : []
 
}

