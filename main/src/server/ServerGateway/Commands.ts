import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums"
import {  } from "server/Build System/ItemRequest"
import lotRequest from "server/Lot System/lotRequest"
import { getInventoryDataWrapper } from "server/CSMiddleware/InventoryDataRequest"
import { setActiveItem } from "server/Store/Actions/playerAction"



interface commands {
    [result:string]: (player:Player,payload:unknown) => void
}

export default {

    //[Request_ID.Inventory_Data]: getInventoryDataWrapper,
    [Request_ID.Lot_Request]: lotRequest

    
} as commands 



















