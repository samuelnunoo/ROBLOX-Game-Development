import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {Option} from "@rbxts/rust-option-result";
const serverGateway = game.GetService("ReplicatedStorage").serverGateway
import commands from "server/ServerGateway/Commands"
import { initMiddleware } from "./MiddleWare";



export const filterRequest = (method:unknown) => method !== undefined 
export const processRequest = (player:Player,request_ID:unknown,payload:unknown) => {
    return Option.some( commands[request_ID as Request_ID])
        // Valid Request_ID Check
        .filter( (method) => filterRequest(method))
        // Middleware 
        .map( (method) => {
            initMiddleware(player,request_ID,payload)
            return method})
        // Method Execution
        .map((method) => {
            method(player,payload)
            return true 
        })
        .unwrapOr(false)

}



