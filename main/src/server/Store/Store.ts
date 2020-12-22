import { Store, AnyAction } from "@rbxts/rodux";
import ClientMiddleware from "./ClientMiddleware"
import Reducer, { IReducer } from "./Reducers/index"
import * as actions from "./Actions/index"



const store = new Store<IReducer, AnyAction, {}>(Reducer, {}, [ClientMiddleware])

export default store















