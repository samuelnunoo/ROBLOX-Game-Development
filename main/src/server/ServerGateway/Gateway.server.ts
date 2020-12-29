export {}
import {processRequest} from "server/ServerGateway/Main"

// Manages access to the serverGateway from the client 
const serverRemote = game.GetService("ReplicatedStorage").serverRemote
serverRemote.OnServerEvent.Connect(processRequest)