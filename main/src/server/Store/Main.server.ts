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






players.ChildAdded.Connect( (plr) => createPlayer(plr as Player))

