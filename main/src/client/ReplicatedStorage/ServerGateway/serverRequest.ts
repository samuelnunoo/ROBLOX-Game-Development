import { Request_ID } from "./Enums";
const serverRemote = game.GetService("ReplicatedStorage").serverRemote

export default (Request_ID:Request_ID,payload:unknown) => {
    serverRemote.FireServer(Request_ID,payload);
    

}

















