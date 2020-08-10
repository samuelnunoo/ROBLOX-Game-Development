import { Store } from "@rbxts/rodux";
import ClientMiddleware from "./ClientMiddleware"
import Reducer from "./Reducers/index"
import * as actions from "./Actions/index"

export interface IStore {

}
const store = new Store<any,any,any>(Reducer, {}, [ClientMiddleware])
















