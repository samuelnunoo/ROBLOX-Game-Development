import store from "../Store/Store"
import { Store, AnyAction } from "@rbxts/rodux"
import { IReducer } from "./Reducers"
import { ItemProperties } from "./Reducers/itemData"
import * as placement from "client/ReplicatedStorage/BuildSystem/placementOperations"
import {updateAction} from "../Store/Actions/itemAction"
const buildRemote = game.GetService("ReplicatedStorage").buildEvent



export {}


const checkOwnership = (store:Store<IReducer, AnyAction>) => (player:Player, itemID:string) => {
    const state  = store.getState()
    const playerData = state.playerData.get(player.UserId)

    if (playerData) {
        const inInventory = playerData.inventory.get(itemID)

        if (inInventory) {
            const itemData = state.itemData.get(itemID) as ItemProperties
            const notPlaced = itemData && itemData?.lotSave !== undefined 

            if (notPlaced) {

                return true 


            }




        

        }


   
    }

    return false
}


const buildRequest = (store: Store<IReducer, AnyAction>) => (player:Player, itemID:string, pos: Vector3, rot: Vector3) => {
    const validTypes = typeOf(itemID) == "string" && typeOf(pos) == "Vector3"
    const state = store.getState()
  
    if (validTypes) {
        const validOwnership = checkOwnership(store)(player, itemID)
        const playerData = state.playerData.get(player.UserId)
        const item = state.itemData.get(itemID)?.model as  BasePart
        const activeLot =  playerData?.activeLot as BasePart

        item.Position = pos
        item.Orientation = new Vector3(0, rot.Y, 0)
        const validOperation = placement.isInBounds(activeLot)(item)

        if (validOperation) {

            const offset = placement.offset(activeLot)(item)






        }

        


    }
}

const updatePosition = (store: Store<IReducer, AnyAction>) => 
(payload: payload) => {
    
    const itemData = Object.deepCopy(store.getState().itemData.get(payload.itemID) as ItemProperties)
    itemData.orientation = payload.rot
    itemData.offset = payload.offset
    itemData.lotSave = "ok"

    const action = updateAction(itemData)
    store.dispatch(action)
}


interface payload {
    player: Player;
    lot: BasePart;
    itemID:string;
    rot: Vector3;
    offset: Vector3;
}











