import { Store } from "@rbxts/rodux";
import { IReducer } from "server/Store/Reducers";
import {Option} from "@rbxts/rust-option-result"
import { values, playerId } from "server/Store/Reducers/playerData";
import { setActiveItem } from "server/Store/Actions/playerAction";
import { isInBounds } from "client/ReplicatedStorage/BuildSystem/placementOperations";




export const isInInventory = (store:Store<IReducer>) => (itemID:unknown, player:Player) => {

    const isValid = Option.some(store.getState().playerData.get(player.UserId) as values)
    .filter( (data:values) => data !== undefined)
    .map( (data:values) => data.inventory.get(itemID as string) || false)
    .unwrapOr(false)

    return isValid && typeOf(itemID) === "string"
}

export const ItemRequest = (store:Store<IReducer>) => (itemID:unknown, player:Player) => {
   if ( isInInventory(store)(itemID,player)) {
       store.dispatch(setActiveItem(player,itemID as string))
   }
}


