import store from "../Store/Store"
import {lotAction} from "../Store/Actions/index";
import { AnyAction } from "@rbxts/rodux";
import { LotAction } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";
import { IReducer } from "server/Store/Reducers";
import {setActiveLot} from "server/Store/Actions/playerAction"
import * as _ from "client/ReplicatedStorage/Logic/Monad"


interface payload {
    state: IReducer;
    player: Player;
    lot: unknown
}

const HttpService = game.GetService("HttpService")
export const isValid = ({state, player, lot}:payload) => {
    const playerData = _.Maybe.fromNullable(state.playerData.get(player.UserId))
        .filter((data: any) => data.activeLot.lot == undefined)
        .getOrElse(false)

    const validLot = _.Maybe.fromNullable(state.availableLots.get(lot as Instance))
        .filter((lot:any)=> lot == undefined )
        .getOrElse(false)

    return typeOf(lot) === "Instance" && validLot && playerData
    
   
}

export const setPlayerData = ({state, player, lot }: payload ) => {
    const lotID = HttpService.GenerateGUID(false)
    const newOwner = setActiveLot(player,lot as Instance,lotID)
    store.dispatch(newOwner)

    return {state,player,lot}
}

export const setGameState = ({state, player, lot}:payload) => {
    const action = lotAction(lot as Instance, player)
    store.dispatch(action)
    
    return true 

}

export default function lotRequest(player:Player, lot:unknown): boolean {
    const state = _.Maybe.fromNullable({state:store.getState(), player, lot})
        .filter(isValid)
        .map(setPlayerData)
        .map(setGameState)
        .getOrElse(false)

    return state 
        
}


