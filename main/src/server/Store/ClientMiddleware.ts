import { Action } from "@rbxts/rodux"

const clientRemote: RemoteEvent = game.GetService("ReplicatedStorage").clientRelay

const DeployAction: (remote:RemoteEvent) => (action: Action) => void
 = (remote) => (action) => {
    remote.FireAllClients(action)
}


const clientMiddleware = (nextDispatch:any, store: Rodux.Store<any,any>) => {
    return function (action: Action) {
        DeployAction(clientRemote)(action)
    }
        
}

export default clientMiddleware

