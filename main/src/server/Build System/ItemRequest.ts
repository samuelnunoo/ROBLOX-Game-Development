import { Store } from "@rbxts/rodux";
import { IServerReducer } from "server/Store/Reducers";
import {Option} from "@rbxts/rust-option-result"
import { values, playerId } from "server/Store/Reducers/playerData";
import { setActiveItem } from "server/Store/Actions/playerAction";
import { isInBounds } from "client/ReplicatedStorage/BuildSystem/placementOperations";

import store from "../Store/Store"
import { ItemProperties } from "server/Store/Reducers/itemData";
import { updateLot } from "server/Store/Actions/itemAction";

const ReplicatedStorage = game.GetService("ReplicatedStorage")

export const isInInventory = (store:Store<IServerReducer>) => (itemID:unknown, player:Player) => {

    const isValid = Option.some(store.getState().playerData.get(player.UserId) as values)
    .filter( (data:values) => data !== undefined)
    .map((data:values) => data.inventory.get(itemID as string) || false)
    .unwrapOr(false)

    return isValid && typeOf(itemID) === "string"
}


export const ItemRequest = (store:Store<IServerReducer>) => ( player:Player,itemID:unknown,) => {
   if ( isInInventory(store)(itemID,player)) {
       store.dispatch(setActiveItem(player,itemID as string))
   }
}

export const getModel = (RS:ReplicatedStorage) => (name:string) => {
    return RS.Models.FindFirstChild(name)
}

export const modelRequestWrapper = (player:Player, itemID:unknown): Model|false => {
    return modelRequest(store)(ReplicatedStorage)(player, itemID)
}


export const assignItemToLot = (store:Store<IServerReducer>) => (itemID:string, lotID:string) => {

   return Option.some(store.getState().itemData.get(itemID) as ItemProperties)
       .filter(values => values !== undefined)
       .map( values => { 
           updateLot(values.id)(lotID)
           return values.model
        })
        .unwrap()
}

export const modelRequest = (store:Store<IServerReducer>) => (RS:ReplicatedStorage) => (player:Player, itemID:unknown): Model| false => {

   const result = Option.some(store.getState().playerData.get(player.UserId) as values)
        .filter( values => values !== undefined )
        .filter( values => values.inventory.get(itemID as string) === true)
        .map( values => { values.inventory.set(itemID as string, false); return values })
        .filter( values => values.activeLot.save !== undefined)
        .map( values => assignItemToLot(store)(itemID as string, values.activeLot.save as string))
        
   return result.isSome() ? result.unwrap() : false 


}

    
    


