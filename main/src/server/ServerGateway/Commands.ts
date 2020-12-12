import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums"



interface commands {
    [result:string]: (player:Player,payload:unknown) => void
}

export default {
    [Request_ID.Integration_Test]: (player:Player,payload:unknown) => {
        
    }
    
} as commands 



















