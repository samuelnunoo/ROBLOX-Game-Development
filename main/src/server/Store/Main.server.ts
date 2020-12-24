import store from "../Store/Store";
import {Store, AnyAction} from "@rbxts/rodux"
import {addPlayerAction, removePlayerAction} from "../Store/Actions/playerAction"
import { IServerReducer } from "./Reducers";
const players = game.GetService("Players")

// --- Join Logic -- //
const addPlayer= <T>(store:Store<T, AnyAction>) => (plr:Player): void => {
    const action = addPlayerAction(plr)
    store.dispatch(action)
}

// -- Leave Logic -- //
const removePlayer = <T>(store:Store<T,AnyAction>) => (plr:Player): void => {
    const action = removePlayerAction(plr)
    store.dispatch(action)
}


const addPlayerWrapper = addPlayer(store)
const removePlayerWrapper = removePlayer(store)


// -- Events -- //
players.ChildAdded.Connect( (plr) => addPlayerWrapper(plr as Player))
players.ChildRemoved.Connect( (plr) => removePlayerWrapper(plr as Player) ) 

