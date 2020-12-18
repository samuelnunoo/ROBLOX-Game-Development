import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums";
interface commands {
    [index:string]: Function
}

//@todo Add LotRequest
export default { 
    [Request_ID.Integration_Test]: () => {
    }

} as commands