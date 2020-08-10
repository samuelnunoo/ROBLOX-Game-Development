import {Store} from "@rbxts/rodux";
import Interceptor from "./Interceptor"
import Reducer from "./Reducers/index"
import { Lots } from "./Reducers/availableLots";
import Rodux from "@rbxts/rodux"


export interface ClientStore {
   availableLots: Lots
}

const store = new Store<ClientStore, Rodux.AnyAction>(Reducer)
Interceptor(store)

export default store 


