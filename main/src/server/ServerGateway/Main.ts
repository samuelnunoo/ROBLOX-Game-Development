import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {Option} from "@rbxts/rust-option-result";
const serverGateway = game.GetService("ReplicatedStorage").serverGateway
import commands from "server/ServerGateway/Commands"
import { initMiddleware } from "./MiddleWare";


//@todo write test
export const processRequest = (player:Player,request_ID:unknown,payload:unknown) => {
    Option.some( commands[request_ID as Request_ID])
        // Valid Request_ID Check
        .filter( (method) => method != null)
        // Middleware 
        .map( (method) => {
            initMiddleware(player,request_ID,payload)
            return method})
        // Method Execution
        .map((method) => method(player,payload))
}



