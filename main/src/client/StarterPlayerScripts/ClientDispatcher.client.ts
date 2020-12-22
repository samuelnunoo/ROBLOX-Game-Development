const serverGateway = game.GetService("ReplicatedStorage").serverGateway;
import clientEvents from "client/ReplicatedStorage/ServerGateway/ClientEvents"
import { Request_ID } from "client/ReplicatedStorage/ServerGateway/Enums";
import {Option} from "@rbxts/rust-option-result"
import dispatchRequest from "client/ReplicatedStorage/ServerGateway/dispatchRequest"


serverGateway.OnClientEvent.Connect(dispatchRequest)