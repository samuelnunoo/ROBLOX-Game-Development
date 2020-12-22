import {combineReducers} from "@rbxts/rodux";
import serverData from "./serverData"
import {serverStore} from "./serverData"


export interface IReducer {
    serverData: serverStore
}

export default combineReducers<IReducer>({
    serverData
})




