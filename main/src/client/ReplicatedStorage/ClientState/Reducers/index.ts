import {combineReducers} from "@rbxts/rodux";
import serverData from "./serverData"
import {serverStore} from "./serverData"


export interface IClientReducer {
    serverData: serverStore
}

export default combineReducers<IClientReducer>({
    serverData
})




