import {combineReducers} from "@rbxts/rodux";
import availableLots, { Lots } from "../../../client/ReplicatedStorage/ClientState/Reducers/availableLots"
import playerData, {playerReducer, playerId} from "../Reducers/playerData"
export interface IReducer {
    availableLots: Lots;
    playerData: playerId
}

export default combineReducers<IReducer>({
    availableLots,
    playerData,
 
})


