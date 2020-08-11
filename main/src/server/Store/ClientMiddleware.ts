import { Action, AnyAction } from "@rbxts/rodux"
import { IState } from "./Store"

const clientRemote: RemoteEvent = game.GetService("ReplicatedStorage").clientRelay

const DeployAction: (remote:RemoteEvent) => (action: Action) => void
 = (remote) => (action) => {
    remote.FireAllClients(action)
}

const clientMiddleware = (nextDispatch:Fn) => {
    return function (action: Action) {
        DeployAction(clientRemote)(action)
        nextDispatch(action)
    }
        
}

export default clientMiddleware

