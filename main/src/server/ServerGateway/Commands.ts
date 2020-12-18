import {Request_ID} from "client/ReplicatedStorage/ServerGateway/Enums"
import { modelRequest, modelRequestWrapper } from "server/Build System/ItemRequest"
import { getInventoryDataWrapper } from "server/CSMiddleware/InventoryDataRequest"
import { setActiveItem } from "server/Store/Actions/playerAction"



interface commands {
    [result:string]: (player:Player,payload:unknown) => void
}

export default {
    [Request_ID.Integration_Test]: (player:Player,payload:unknown) => {
        
    },
    [Request_ID.Active_Item]: setActiveItem,
    [Request_ID.Item_Request]: modelRequestWrapper,
    [Request_ID.Inventory_Data]: getInventoryDataWrapper,
    [Request_ID.Lot_Request]:  //@todo0 add relavent method

    
} as commands 



















