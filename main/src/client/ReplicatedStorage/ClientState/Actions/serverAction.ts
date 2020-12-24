import {ISetLot} from "../Reducers/serverData"
import {AnyAction} from "@rbxts/rodux"
// Sets the lot on the server 

export interface addPlayer extends AnyAction {
    type: "addPlayer";
    payload: {
        id:number;
    }
   
}

export interface removePlayer extends AnyAction {
    type: "removePlayer";
    payload: {
        id: number;
    }
}

export function setLotAction (id:number,lot:string,isAdd:boolean) {
    return {
        type: "setLot",
        payload: {
            id,
            lot,
            isAdd
        }
    } as ISetLot
}

export function addPlayerAction (player:Player) {
    return {
        type: "addPlayer",
        payload:{
            id: player.UserId
        }
    }  as addPlayer 
}

export function removePlayerAction (player:Player) {
    return {
        type: "removePlayer",
        payload: {
            id: player.UserId
        }
    } as removePlayer 
}
