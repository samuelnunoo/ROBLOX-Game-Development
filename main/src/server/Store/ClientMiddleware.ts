import { Action, AnyAction } from "@rbxts/rodux"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums"


const allowSet = new Set<String>()
    .add("setLot")


const clientRemote: RemoteEvent = game.GetService("ReplicatedStorage").serverGateway

const DeployAction: (remote:RemoteEvent) => (action: Action) => void
 = (remote) => (action) => {
    if (!allowSet.has(action.type)) return;
    remote.FireAllClients(Request_ID.Update_Store,action)
}

const clientMiddleware = (nextDispatch:Fn) => {
    return function (action: Action) {
        DeployAction(clientRemote)(action)
        nextDispatch(action)
    }
        
}

export default clientMiddleware

