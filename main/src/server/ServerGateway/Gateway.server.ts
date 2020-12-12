export {}
import {processRequest} from "server/ServerGateway/Main"

// Manages access to the serverGateway from the client 
const serverGateway = game.GetService("ReplicatedStorage").serverGateway
serverGateway.OnServerEvent.Connect(processRequest)