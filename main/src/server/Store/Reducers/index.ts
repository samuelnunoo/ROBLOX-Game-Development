import {combineReducers} from "@rbxts/rodux";
import availableLots, { Lots } from "../../../client/ReplicatedStorage/ClientState/Reducers/availableLots"
import playerData, {playerReducer, playerId} from "../Reducers/playerData"
import lotData, { lotStore, ILotStore } from "../Reducers/lotData"
export interface IReducer {
    availableLots: Lots;
    playerData: playerId
    lotData: ILotStore
}

export default combineReducers<IReducer>({
    availableLots,
    playerData,
    lotData
 
})


