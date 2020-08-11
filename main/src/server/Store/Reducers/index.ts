import {combineReducers} from "@rbxts/rodux";
import availableLots, { Lots } from "../../../client/ReplicatedStorage/ClientState/Reducers/availableLots"
import activeLot, { activeLots } from "./activeLot"
export interface IReducer {
    availableLots: Lots
    activeLot: activeLots
}

export default combineReducers<IReducer>({
    availableLots,
    activeLot
})

