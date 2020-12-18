import { AnyAction } from "@rbxts/rodux"

const clientRemote: RemoteEvent = game.GetService("ReplicatedStorage").serverGateway

const initInterceptor: (remote:RemoteEvent) => (store:Rodux.Store<{ availableLots: Map<Instance,Player|Boolean>}, AnyAction>) => void  = 
    (remote) => (store) => {
    remote.OnClientEvent.Connect((action: AnyAction)=> store.dispatch(action))
} //@note Interception

export default initInterceptor(clientRemote)
