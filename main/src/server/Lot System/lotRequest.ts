import { setLotAction } from "server/Store/Actions/serverAction"
import store from "server/Store/store"
import {Option} from "@rbxts/rust-option-result"


type payload = { lot:string, isAdd:boolean}

export default (player:Player,payload:unknown) => {

    Option.some(payload as payload)
        .filter( ({lot}) => typeOf(lot) === "string")
        .filter( ({isAdd}) => typeOf(isAdd) === "boolean")
        .map( ({lot,isAdd})=> setLotAction(player.UserId,lot,isAdd))
        .map( action => store.dispatch(action))
}