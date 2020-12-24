import { AnyAction } from "@rbxts/rodux"
import { Option } from "@rbxts/rust-option-result"
import { IClientReducer } from "./Reducers"
import store from "./Store"

const clientRemote: RemoteEvent = game.GetService("ReplicatedStorage").serverGateway

export const initInterceptor = <S>(store:Rodux.Store<S, AnyAction>) =>
(payload:AnyAction)  => {
    store.dispatch(payload)
}
 
export default initInterceptor(store)