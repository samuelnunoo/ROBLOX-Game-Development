import { Request_ID } from "./Enums";
const serverGateway = game.GetService("ReplicatedStorage").serverGateway;

export default (Request_ID:Request_ID,payload:unknown) => {
    serverGateway.FireServer(Request_ID,payload);
}

















