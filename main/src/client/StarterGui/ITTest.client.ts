export {}
import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums"

const serverRemote = game.GetService("ReplicatedStorage")
    .serverRemote.FireServer(Request_ID.Integration_Test, {})



