import { LotAction } from "client/ReplicatedStorage/ClientState/Reducers/availableLots";
import { ActiveLotAction } from "../Reducers/activeLot";

export function lotAction(lot: Instance, value: Player|Boolean): LotAction {
    return {
        type: "lots",
        lot,
        value
    }
} 

export function setActive(player: Player, value: Instance): ActiveLotAction {
    return {
        type: "activeLot",
        player,
        value 
    }
}

