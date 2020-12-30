import { ObserverTypes } from "client/ReplicatedStorage/Observer/notifyListeners";
import ClientEvents from "client/ReplicatedStorage/ServerGateway/ClientEvents";
const serverRemote = game.GetService("ReplicatedStorage").serverRemote


type eventType = typeof ClientEvents

export default function <R extends keyof eventType>
    (player:Player,request:R, 
        ...payload:Parameters<eventType[R]> ) {
        serverRemote.FireClient(player,request,...payload)
    }
