import {Store} from "@rbxts/rodux";
import Interceptor from "./Interceptor"
import Reducer from "./Reducers/index"
import Rodux from "@rbxts/rodux"
import {IClientReducer} from "./Reducers/index"

const store = new Store<IClientReducer, Rodux.AnyAction>(Reducer)
export default store 


