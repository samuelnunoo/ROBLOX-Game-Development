import { AnyAction } from "@rbxts/rodux"
import { Option } from "@rbxts/rust-option-result"
import { IReducer } from "./Reducers"
import store from "./Store"

const clientRemote: RemoteEvent = game.GetService("ReplicatedStorage").serverGateway

export const initInterceptor = (store:Rodux.Store<IReducer, AnyAction>) =>
(payload:AnyAction)  => {
    store.dispatch(payload)
}
 
export default initInterceptor(store)