import store from "../Store/Store"
import {lotAction} from "../Store/Actions/index";
import { AnyAction } from "@rbxts/rodux";
import { LotAction } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";

const lotRemote = game.GetService("ReplicatedStorage").LotRequest

function lotRequest(player:Player, lot:unknown): boolean {
    const lots = store.getState().availableLots

    if (lots.get(lot as Instance) === false) {
        const newOwner = lotAction(lot as Instance, player) 
        store.dispatch<LotAction>(newOwner)

        return true
        
    }

   return false 

}


lotRemote.OnServerInvoke = lotRequest

