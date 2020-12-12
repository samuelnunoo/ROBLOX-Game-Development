import { Request_ID } from "./Enums";
const serverGateway = game.GetService("ReplicatedStorage").serverGateway;
export const serverRequest = (Request_ID:Request_ID,payload:unknown) => {
    serverGateway.FireServer(Request_ID,payload);
}














