import {Store} from "@rbxts/rodux";
import Interceptor from "./Interceptor"
import Reducer from "./Reducers/index"
import Rodux from "@rbxts/rodux"
import {IReducer} from "./Reducers/index"

const store = new Store<IReducer, Rodux.AnyAction>(Reducer)

export default store 


