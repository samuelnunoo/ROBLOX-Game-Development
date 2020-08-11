import { Store, AnyAction } from "@rbxts/rodux";
import ClientMiddleware from "./ClientMiddleware"
import Reducer, { IReducer } from "./Reducers/index"
import * as actions from "./Actions/index"
import { Lots, LotAction } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";

export interface IState {
availableLots: Lots
}
const store = new Store<IReducer, AnyAction, {}>(Reducer, {}, [ClientMiddleware])

export default store















