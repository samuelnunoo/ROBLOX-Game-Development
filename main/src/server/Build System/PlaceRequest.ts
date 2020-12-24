

import store from "../Store/Store"
import { IServerReducer } from "server/Store/Reducers"
import { Store } from "@rbxts/rodux"
import { Option } from "@rbxts/rust-option-result"
import { values } from "server/Store/Reducers/playerData"
import { isInBounds } from "client/ReplicatedStorage/BuildSystem/placementOperations"
const ReplicatedStorage = game.GetService("ReplicatedStorage")






export const isValid = () => {}


const isModel = (item:unknown) => {
    const isInstance =  typeOf(item) === "Instance" 
    
    if (isInstance) {
        item as Model 
    }
}
const isValidItem = (playerData:values) => (item:Instance) => {

    playerData.activeLot.lot
  

}


const getDimensions = (item:Model) => {
    const {Position, Orientation } = item.PrimaryPart!
    return {Position, Orientation}
}



export const PlaceRequest = (store:Store<IServerReducer>) => (player:Player, item:unknown) => {

    const state = Option.some(store.getState().playerData.get(player.UserId) as values)
        .filter(values => values !== undefined && typeOf(item) === "Instance")
        .filter(values => values.activeItem === (item as Model).Name)
        .filter(values => (item as Model).PrimaryPart !== undefined)
        .filter(values => isInBounds(values.activeLot.lot!)((item as Model).PrimaryPart!))
   

}