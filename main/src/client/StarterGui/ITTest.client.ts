export {}
import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums"

const serverGateway = game.GetService("ReplicatedStorage")
    .serverGateway.FireServer(Request_ID.Integration_Test, {})



