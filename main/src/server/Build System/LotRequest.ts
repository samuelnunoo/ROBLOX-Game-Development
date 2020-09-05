import store from "../Store/Store"
import {lotAction} from "../Store/Actions/index";
import { AnyAction } from "@rbxts/rodux";
import { LotAction, Lots } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";
import { IReducer } from "server/Store/Reducers";
import {setActiveLot} from "server/Store/Actions/playerAction"
import * as _ from "client/ReplicatedStorage/Logic/Monad"
import { values } from "server/Store/Reducers/playerData";
import {Option} from "@rbxts/rust-option-result"

interface payload {
    state: IReducer;
    player: Player;
    lot: unknown
}

const HttpService = game.GetService("HttpService")

export const isValid = ({state, player, lot}:payload): boolean => {
   
    const playerData = Option.some(state.playerData.get(player.UserId) as values)
        .filter((data: values) => data.activeLot.lot === undefined)
        .and(Option.some(true))
        .unwrapOr(false)
      
    const validLot: boolean = Option.some(state.availableLots.get(lot as Instance) as Player)
        .contains(player)
     
    return typeOf(lot) === "Instance" && validLot && playerData
    
   
}

export const setPlayerData = ({state, player, lot }: payload ): payload => {
    const lotID = HttpService.GenerateGUID(false)
    const newOwner = setActiveLot(player,lot as Instance,lotID)
    store.dispatch(newOwner)

    return {state,player,lot}
}

export const setGameState = ({state, player, lot}:payload): boolean => {
    const action = lotAction(lot as Instance, player)
    store.dispatch(action)
    
    return true 

}


export default function lotRequest(player:Player, lot:unknown): boolean {
    const state =  Option.some({state:store.getState(), player, lot} as payload)
        .filter(isValid)
        .map(setPlayerData)
        .map(setGameState)
        .unwrapOr(false)

    return state 
        
}


