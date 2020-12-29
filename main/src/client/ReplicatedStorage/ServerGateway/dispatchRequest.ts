const serverRemote = game.GetService("ReplicatedStorage").serverRemote;
import clientEvents from "client/ReplicatedStorage/ServerGateway/ClientEvents"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {Option} from "@rbxts/rust-option-result"

type WidenFunc<T> = ((x: T) => void) extends ((x: (...args: infer A) => infer R) => any) ?
    (...args: A) => R : never;

type eventType = typeof clientEvents

export default function <R extends keyof eventType>(request:R, payload:Parameters<eventType[R]>) { 
    (clientEvents[request] as WidenFunc<eventType[keyof eventType]>)(...payload)

}
