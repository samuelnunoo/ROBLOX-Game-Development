import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums";
import Interceptor from "../ClientState/Interceptor";
import requestResponse from "../Lot System/requestResponse";

interface commands {
    [index:string]: Function
}

//@todo Add LotRequest
export default { 
    [Request_ID.Integration_Test]: () => {
    },
    [Request_ID.Update_Store] : Interceptor,
    [Request_ID.Lot_Request]: requestResponse
    

} as commands