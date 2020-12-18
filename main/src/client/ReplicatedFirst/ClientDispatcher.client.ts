const serverGateway = game.GetService("ReplicatedStorage").serverGateway;
import clientEvents from "client/ReplicatedStorage/ServerGateway/ClientEvents"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {Option} from "@rbxts/rust-option-result"

const dispatchRequest = (request:Request_ID,payload:unknown) => { //@note Dispatch LotRequest
    Option.some(clientEvents[request])
    .filter((method) => method !== undefined) 
    .map((method) => method(payload))
}

serverGateway.OnClientEvent.Connect(dispatchRequest)