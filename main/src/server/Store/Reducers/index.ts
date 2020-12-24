import {combineReducers} from "@rbxts/rodux";
import playerData, {playerReducer, playerId} from "../Reducers/playerData"
import lotData, { lotStore, ILotStore } from "../Reducers/lotData"
import itemData, { IItem } from "./itemData"
import { serverStore } from "client/ReplicatedStorage/ClientState/Reducers/serverData";
import serverData from "client/ReplicatedStorage/ClientState/Reducers/serverData"

export interface IServerReducer {

    playerData: playerId;
    lotData: ILotStore;
    itemData: IItem;
    serverData: serverStore
}

export default combineReducers<IServerReducer>({
    playerData,
    lotData,
    itemData,
    serverData
})


