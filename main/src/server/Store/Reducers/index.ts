import {combineReducers} from "@rbxts/rodux";
import availableLots, { Lots } from "../../../client/ReplicatedStorage/ClientState/Reducers/availableLots"

export interface IReducer {
    availableLots: Lots
}

export default combineReducers<IReducer>({
    availableLots
})