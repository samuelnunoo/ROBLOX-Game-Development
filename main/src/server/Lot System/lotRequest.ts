import { setLotAction } from "client/ReplicatedStorage/ClientState/Actions/serverAction"
import store from "server/Store/store"
import {Option} from "@rbxts/rust-option-result"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import fireClient from "server/ServerGateway/fireClient";
import {IObserverData} from "client/ReplicatedStorage/Observer/notifyListeners"

type payload = { lot:string, isAdd:boolean}

export default (player:Player,payload:unknown) => {

    const data = Option.some(payload as payload)
        .filter( ({lot}) => typeOf(lot) === "string")
        .filter( ({isAdd}) => typeOf(isAdd) === "boolean")
        .map( ({lot,isAdd})=> setLotAction(player.UserId,lot,isAdd))
        .map( action => {
            store.dispatch(action);
            return store.getState().serverData.lots.get((payload as payload).lot) === player.UserId
        })
        .unwrapOr(false)
        fireClient(player,Request_ID.Observer,{request:Request_ID.Lot_Request,data})

    
}
