import { Store, AnyAction } from "@rbxts/rodux";
import ClientMiddleware from "./ClientMiddleware"
import Reducer, { IServerReducer } from "./Reducers/index"
import * as actions from "./Actions/index"



const store = new Store<IServerReducer, AnyAction, {}>(Reducer, {}, [ClientMiddleware])

export default store















