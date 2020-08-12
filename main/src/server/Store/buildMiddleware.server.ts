import store from "../Store/Store"
import { Store, AnyAction } from "@rbxts/rodux"
import { IReducer } from "./Reducers"
const buildRemote = game.GetService("ReplicatedStorage").buildEvent



export {}


const checkOwnership = (store:Store<IReducer, AnyAction>) => (player:Player, itemID:string) => {
    const state  = store.getState()
    const playerData = state.playerData.get(player.UserId)
    if (playerData) {
        const item = playerData.inventory.get(itemID)
        if (item) {
        

        }


   
    }

    return false
}


const buildRequest = (player:Player, itemID:string, pos: Vector3) => {
    const isValid = typeOf(itemID) == "string" && typeOf(pos) == "Vector3"

    if (isValid) {

    }
}


















