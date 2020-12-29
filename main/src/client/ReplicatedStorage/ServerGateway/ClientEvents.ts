import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums";
import Interceptor from "../ClientState/Interceptor";
import requestResponse from "../Lot System/requestResponse";
import notifyListeners from "../Observer/notifyListeners";


type commands = Record<Request_ID,any>

//@todo Add LotRequest
export default { 
    [Request_ID.Update_Store] : Interceptor,
    [Request_ID.Lot_Request]: requestResponse,
    [Request_ID.Observer]: notifyListeners
} 