const serverGateway = game.GetService("ReplicatedStorage").serverGateway;
import clientEvents from "client/ReplicatedStorage/ServerGateway/ClientEvents"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {Option} from "@rbxts/rust-option-result"



export default (request:Request_ID,payload:unknown) => { 
    return Option.some(clientEvents[request])
    .filter((method) => method !== undefined) 
    .map((method) => {
        method(payload)
        return true
    })
    .unwrapOr(false)
}
