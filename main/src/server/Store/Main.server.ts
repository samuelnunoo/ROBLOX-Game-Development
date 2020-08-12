import store from "../Store/Store";
import {Store, AnyAction} from "@rbxts/rodux"
import {playerAction} from "../Store/Actions/playerAction"
import { IReducer } from "./Reducers";
const players = game.GetService("Players")

// --- Join Logic -- //

const newPlayer = <T>(store:Store<T, AnyAction>) => (plr:Player): void => {
    const action = playerAction(plr)
    store.dispatch(action)
}
const createPlayer = newPlayer(store)


// -- Check Logic
const isValid = (player: Player, object:string, position: Vector3) => {
    const validtype = typeOf(object) == "string"
    && typeOf(position) == "Vector3"


// get Active Lot
// object is in inventory
// Position is Valid







players.ChildAdded.Connect( (plr) => createPlayer(plr as Player))











